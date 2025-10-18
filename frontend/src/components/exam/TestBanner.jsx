import React from 'react';
import Timer from './Timer';
import AudioControl from './AudioControl';
import { HelpCircle, EyeOff, Eye, Settings } from 'lucide-react';

const TestBanner = ({
  candidateName,
  candidateNumber,
  timeLeft,
  isListeningTest,
  audioUrl,
  audioVolume,
  isAudioPlaying,
  onVolumeChange,
  onTogglePlay,
  audioRef,
  onToggleHeader,
  onShowHelp,
  currentPart
}) => {
  return (
    <div className="test-banner">
      <div className="banner-info">
        <div className="candidate-info">
          <span className="candidate-name">{candidateName}</span>
          <span className="candidate-number">ID: {candidateNumber}</span>
        </div>

        <Timer 
          timeLeft={timeLeft} 
          currentPart={currentPart}
        />

        <div className="banner-actions">
          <button 
            className="banner-btn"
            onClick={onShowHelp}
            title="Help"
          >
            <HelpCircle size={20} />
          </button>
          <button 
            className="banner-btn"
            onClick={onToggleHeader}
            title="Hide Header"
          >
            <EyeOff size={20} />
          </button>
        </div>
      </div>

      {isListeningTest && audioUrl && (
        <AudioControl
          audioRef={audioRef}
          volume={audioVolume}
          isPlaying={isAudioPlaying}
          onVolumeChange={onVolumeChange}
          onTogglePlay={onTogglePlay}
        />
      )}
    </div>
  );
};

export default TestBanner;