import React from 'react';
import { Volume2, Play, Pause } from 'lucide-react';

const AudioControl = ({ audioRef, volume, isPlaying, onVolumeChange, onTogglePlay }) => {
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    onVolumeChange(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    onTogglePlay();
  };

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-control">
      <button 
        className="audio-play-btn"
        onClick={handleTogglePlay}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <div className="audio-time">
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>

      <div className="audio-volume-control">
        <Volume2 size={18} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <span className="volume-value">{volume}%</span>
      </div>
    </div>
  );
};

export default AudioControl;