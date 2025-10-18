import { ref, get, set, update, push } from 'firebase/database';
import { database } from '../config/firebase';

class ExamFirebaseService {
  /**
   * Get exam with all sections and questions
   */
  async getExam(examId) {
    try {
      const examRef = ref(database, `exams/${examId}`);
      const snapshot = await get(examRef);
      
      if (!snapshot.exists()) {
        throw new Error('Exam not found');
      }
      
      const examData = snapshot.val();
      
      // Convert sections object to array
      if (examData.sections) {
        examData.sections = Object.values(examData.sections).sort((a, b) => a.index - b.index);
        
        // Convert questions object to array for each section
        examData.sections.forEach(section => {
          if (section.questions) {
            section.questions = Object.values(section.questions).sort((a, b) => a.index - b.index);
          }
        });
      }
      
      // Calculate total questions
      examData.totalQuestions = examData.sections?.reduce((sum, section) => {
        return sum + (section.questions?.length || 0);
      }, 0) || 40;
      
      return examData;
    } catch (error) {
      console.error('Error loading exam:', error);
      throw error;
    }
  }

  /**
   * Save user progress
   */
  async saveProgress(examId, progressData) {
    try {
      // Get user from auth context
      const userId = this.getCurrentUserId();
      
      if (!userId) {
        // Save to local storage for anonymous users
        localStorage.setItem(`exam-progress-${examId}`, JSON.stringify(progressData));
        return;
      }
      
      const progressRef = ref(database, `userProgress/${userId}/${examId}`);
      await set(progressRef, {
        ...progressData,
        lastSaved: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }

  /**
   * Load user progress
   */
  async loadProgress(examId) {
    try {
      const userId = this.getCurrentUserId();
      
      if (!userId) {
        // Load from local storage for anonymous users
        const savedProgress = localStorage.getItem(`exam-progress-${examId}`);
        return savedProgress ? JSON.parse(savedProgress) : null;
      }
      
      const progressRef = ref(database, `userProgress/${userId}/${examId}`);
      const snapshot = await get(progressRef);
      
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  /**
   * Submit exam
   */
  async submitExam(examId, submissionData) {
    try {
      const userId = this.getCurrentUserId();
      const submissionId = push(ref(database, 'submissions')).key;
      
      const submission = {
        id: submissionId,
        examId,
        userId: userId || 'anonymous',
        ...submissionData,
        submittedAt: new Date().toISOString(),
        isPublished: false
      };
      
      // Save submission
      const submissionRef = ref(database, `submissions/${submissionId}`);
      await set(submissionRef, submission);
      
      // Clear progress
      if (userId) {
        const progressRef = ref(database, `userProgress/${userId}/${examId}`);
        await set(progressRef, null);
      } else {
        localStorage.removeItem(`exam-progress-${examId}`);
      }
      
      return submissionId;
    } catch (error) {
      console.error('Error submitting exam:', error);
      throw error;
    }
  }

  /**
   * Save notes
   */
  async saveNotes(examId, notes) {
    try {
      const userId = this.getCurrentUserId();
      
      if (!userId) {
        localStorage.setItem(`exam-notes-${examId}`, JSON.stringify(notes));
        return;
      }
      
      const notesRef = ref(database, `userProgress/${userId}/${examId}/notes`);
      await set(notesRef, notes);
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  }

  /**
   * Save highlights
   */
  async saveHighlights(examId, highlights) {
    try {
      const userId = this.getCurrentUserId();
      
      if (!userId) {
        localStorage.setItem(`exam-highlights-${examId}`, JSON.stringify(highlights));
        return;
      }
      
      const highlightsRef = ref(database, `userProgress/${userId}/${examId}/highlights`);
      await set(highlightsRef, highlights);
    } catch (error) {
      console.error('Error saving highlights:', error);
      throw error;
    }
  }

  /**
   * Admin: Update audio URL
   */
  async updateAudioUrl(examId, audioUrl) {
    try {
      const audioRef = ref(database, `exams/${examId}/audioUrl`);
      await set(audioRef, audioUrl);
    } catch (error) {
      console.error('Error updating audio URL:', error);
      throw error;
    }
  }

  /**
   * Get current user ID from auth context
   */
  getCurrentUserId() {
    // This will be implemented based on your auth system
    // For now, return null (anonymous)
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.uid || user.id;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Get all published exams
   */
  async getPublishedExams() {
    try {
      const examsRef = ref(database, 'exams');
      const snapshot = await get(examsRef);
      
      if (!snapshot.exists()) {
        return [];
      }
      
      const examsData = snapshot.val();
      const publishedExams = [];
      
      Object.keys(examsData).forEach(examId => {
        const exam = examsData[examId];
        if (exam.published) {
          publishedExams.push({
            id: examId,
            ...exam
          });
        }
      });
      
      return publishedExams;
    } catch (error) {
      console.error('Error getting published exams:', error);
      return [];
    }
  }

  /**
   * Admin: Import exam from JSON
   */
  async importExam(examData) {
    try {
      const examId = examData.id || push(ref(database, 'exams')).key;
      const examRef = ref(database, `exams/${examId}`);
      
      // Convert arrays to objects with indices
      const formattedExam = {
        ...examData,
        id: examId,
        published: examData.published !== false,
        createdAt: new Date().toISOString()
      };
      
      // Convert sections array to object
      if (Array.isArray(examData.sections)) {
        formattedExam.sections = {};
        examData.sections.forEach((section, index) => {
          const sectionId = `section-${index + 1}`;
          
          // Convert questions array to object
          const questions = {};
          if (Array.isArray(section.questions)) {
            section.questions.forEach((question, qIndex) => {
              const questionId = `q-${question.index || (qIndex + 1)}`;
              questions[questionId] = question;
            });
          }
          
          formattedExam.sections[sectionId] = {
            ...section,
            questions
          };
        });
      }
      
      await set(examRef, formattedExam);
      return examId;
    } catch (error) {
      console.error('Error importing exam:', error);
      throw error;
    }
  }
}

export default new ExamFirebaseService();
