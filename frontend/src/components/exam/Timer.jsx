import React from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ timeLeft, currentPart }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWarningLevel = () => {
    if (timeLeft <= 120) return 'critical'; // 2 minutes
    if (timeLeft <= 300) return 'warning';  // 5 minutes
    if (timeLeft <= 600) return 'caution';  // 10 minutes
    return 'normal';
  };

  const warningLevel = getWarningLevel();
  const minutes = Math.floor(timeLeft / 60);

  return (
    <div className={`timer timer-${warningLevel}`}>
      <Clock size={20} className="timer-icon" />
      <div className="timer-display">
        <span className="timer-text">{formatTime(timeLeft)}</span>
        <span className="timer-label"> | {minutes} minutes left | Part {currentPart}</span>
      </div>
    </div>
  );
};

export default Timer;