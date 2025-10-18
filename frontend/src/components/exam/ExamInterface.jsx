import React, { useState, useEffect, useRef } from 'react';
import ExamHeader from './ExamHeader';
import TestBanner from './TestBanner';
import QuestionNavigation from './QuestionNavigation';
import MainContent from './MainContent';
import FooterNavigation from './FooterNavigation';
import NotesSystem from './features/NotesSystem';
import TextHighlighter from './features/TextHighlighter';
import HelpModal from './HelpModal';
import '../../styles/exam/base.css';
import '../../styles/exam/banner.css';
import '../../styles/exam/navigation.css';
import '../../styles/exam/main.css';
import '../../styles/exam/item.css';
import '../../styles/exam/notepad.css';
import '../../styles/exam/tools.css';
import '../../styles/exam/custom.css';
import '../../styles/exam/question-types.css';

const ExamInterface = ({ examId }) => {
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [reviewMarked, setReviewMarked] = useState([]);
  const [notes, setNotes] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [audioVolume, setAudioVolume] = useState(100);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const contentRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    loadExam();
  }, [examId]);

  useEffect(() => {
    if (exam && timeLeft === null) {
      setTimeLeft(exam.duration);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const loadExam = async () => {
    try {
      // Load exam from Backend API
      const { default: BackendService } = await import('../../services/BackendService');
      const examData = await BackendService.getExamWithSectionsAndQuestions(examId);
      
      // Transform backend data structure to match component expectations
      const transformedExam = {
        id: examData.id,
        title: examData.title,
        type: examData.exam_type || 'listening',
        duration: examData.duration_seconds || 3600,
        audioUrl: examData.audio_url,
        candidateName: 'Student',
        candidateNumber: 'STU-12345',
        totalQuestions: examData.question_count || 40,
        sections: examData.sections || []
      };
      
      setExam(transformedExam);
      
      // Load progress from localStorage (since we're not using Firebase for progress)
      const savedProgress = localStorage.getItem(`exam-progress-${examId}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setAnswers(progress.answers || {});
        setReviewMarked(progress.reviewMarked || []);
        setNotes(progress.notes || []);
        setHighlights(progress.highlights || []);
        setCurrentQuestion(progress.currentQuestion || 1);
      }
    } catch (error) {
      console.error('Failed to load exam:', error);
    }
  };

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
    saveProgress();
  };

  const handleNavigateQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    saveProgress();
  };

  const handleToggleReview = () => {
    setReviewMarked(prev => {
      if (prev.includes(currentQuestion)) {
        return prev.filter(q => q !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
  };

  const saveProgress = async () => {
    try {
      // Save progress to localStorage
      const progressData = {
        currentQuestion,
        answers,
        reviewMarked,
        notes,
        highlights,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(`exam-progress-${examId}`, JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit? You cannot change your answers after submission.')) {
      return;
    }

    try {
      const { default: BackendService } = await import('../../services/BackendService');
      
      // Submit to backend
      await BackendService.createSubmission({
        exam_id: examId,
        user_id_or_session: 'anonymous-' + Date.now(),
        answers: answers,
        exam_type: exam.type || 'listening',
        time_taken: exam.duration - (timeLeft || 0),
        progress_percent: (Object.keys(answers).length / (exam.totalQuestions || 40)) * 100
      });
      
      // Clear progress from localStorage
      localStorage.removeItem(`exam-progress-${examId}`);
      
      alert('Test submitted successfully!');
      window.location.href = '/student/dashboard';
    } catch (error) {
      console.error('Failed to submit exam:', error);
      alert('Failed to submit test. Please try again.');
    }
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    const totalQuestions = exam?.totalQuestions || 40;
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading exam...</div>
      </div>
    );
  }

  const isListeningTest = exam.type === 'listening';
  const totalQuestions = exam.totalQuestions || 40;

  return (
    <div className="exam-interface">
      <ExamHeader 
        isHidden={isHeaderHidden}
      />
      
      <TestBanner
        candidateName={exam.candidateName || 'Student'}
        candidateNumber={exam.candidateNumber || 'STU-12345'}
        timeLeft={timeLeft}
        isListeningTest={isListeningTest}
        audioUrl={exam.audioUrl}
        audioVolume={audioVolume}
        isAudioPlaying={isAudioPlaying}
        onVolumeChange={setAudioVolume}
        onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
        audioRef={audioRef}
        onToggleHeader={() => setIsHeaderHidden(!isHeaderHidden)}
        onShowHelp={() => setShowHelp(true)}
        currentPart={Math.ceil(currentQuestion / 10)}
      />

      <QuestionNavigation
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestion}
        answeredQuestions={Object.keys(answers).map(Number)}
        reviewMarked={reviewMarked}
        onNavigate={handleNavigateQuestion}
        sections={exam.sections || []}
      />

      <MainContent
        ref={contentRef}
        exam={exam}
        currentQuestion={currentQuestion}
        answer={answers[currentQuestion]}
        onAnswerChange={(value) => handleAnswerChange(currentQuestion, value)}
      />

      <FooterNavigation
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isReviewMarked={reviewMarked.includes(currentQuestion)}
        onToggleReview={handleToggleReview}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />

      <NotesSystem
        notes={notes}
        onNotesChange={setNotes}
      />

      <TextHighlighter
        contentRef={contentRef}
        highlights={highlights}
        onHighlightsChange={setHighlights}
        onCreateNote={(highlightedText, x, y) => {
          const newNote = {
            id: Date.now(),
            x,
            y,
            text: '',
            highlightedText,
            zIndex: 500 + notes.length
          };
          setNotes([...notes, newNote]);
        }}
      />

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {isListeningTest && exam.audioUrl && (
        <audio
          ref={audioRef}
          src={exam.audioUrl}
          onPlay={() => setIsAudioPlaying(true)}
          onPause={() => setIsAudioPlaying(false)}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default ExamInterface;