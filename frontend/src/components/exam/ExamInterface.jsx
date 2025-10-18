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
      // Load exam from Firebase
      const { FirebaseService } = await import('../../services/FirebaseService');
      const examData = await FirebaseService.getExam(examId);
      setExam(examData);
      
      // Load progress if exists
      const progress = await FirebaseService.loadProgress(examId);
      if (progress) {
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
      const { FirebaseService } = await import('../../services/FirebaseService');
      await FirebaseService.saveProgress(examId, {
        currentQuestion,
        answers,
        reviewMarked,
        notes,
        highlights,
        lastSaved: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit? You cannot change your answers after submission.')) {
      return;
    }

    try {
      const { default: FirebaseService } = await import('../../services/FirebaseService');
      await FirebaseService.submitExam(examId, {
        answers,
        notes,
        highlights,
        submittedAt: new Date().toISOString()
      });
      
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