import React from 'react';
import { X } from 'lucide-react';

const HelpModal = ({ onClose }) => {
  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <div className="help-modal-header">
          <h2>Test Instructions & Features</h2>
          <button className="help-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="help-modal-content">
          <section className="help-section">
            <h3>📝 Notes System</h3>
            <ul>
              <li><strong>Create Note:</strong> Click the "Add Note" button or create from highlighted text</li>
              <li><strong>Move Note:</strong> Click and drag the note header to reposition</li>
              <li><strong>Edit Note:</strong> Click inside the note to type</li>
              <li><strong>Delete Note:</strong> Click the X button in the top-right corner</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>🖍️ Text Highlighting</h3>
            <ul>
              <li><strong>Highlight Text:</strong> Select any text in the question area</li>
              <li><strong>Choose Color:</strong> Right-click or use context menu to select from 4 colors:
                <div className="color-samples">
                  <span className="color-sample" style={{ background: 'rgba(255, 255, 0, 0.3)' }}>Yellow</span>
                  <span className="color-sample" style={{ background: 'rgba(0, 255, 0, 0.2)' }}>Green</span>
                  <span className="color-sample" style={{ background: 'rgba(0, 100, 255, 0.2)' }}>Blue</span>
                  <span className="color-sample" style={{ background: 'rgba(255, 192, 203, 0.4)' }}>Pink</span>
                </div>
              </li>
              <li><strong>Create Note:</strong> Select "Add Note" from the context menu</li>
              <li><strong>Remove Highlight:</strong> Right-click highlighted text and select "Remove"</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>🎵 Audio Control (Listening Tests Only)</h3>
            <ul>
              <li><strong>Play/Pause:</strong> Click the play button or press Space bar</li>
              <li><strong>Volume:</strong> Use the volume slider to adjust (0-100%)</li>
              <li><strong>Time Display:</strong> Shows current time and total duration</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>⏱️ Timer</h3>
            <ul>
              <li>Countdown timer shows time remaining</li>
              <li><strong className="text-yellow-600">Yellow warning</strong> at 10 minutes remaining</li>
              <li><strong className="text-red-600">Red warning</strong> at 5 minutes remaining</li>
              <li>Test auto-submits when time expires</li>
            </ul>
          </section>

          <section className="help-section">
            <h3>🧭 Navigation</h3>
            <ul>
              <li><strong>Question Numbers:</strong> Click any question number to jump to it</li>
              <li><strong>Previous/Next:</strong> Use buttons at the bottom to move between questions</li>
              <li><strong>Mark for Review:</strong> Check the box to mark current question for later review</li>
              <li><strong>Question States:</strong>
                <ul className="state-legend">
                  <li><span className="state-indicator state-unanswered"></span> Black = Unanswered</li>
                  <li><span className="state-indicator state-answered"></span> White = Answered</li>
                  <li><span className="state-indicator state-current"></span> Blue = Current</li>
                  <li><span className="state-indicator state-review"></span> Yellow ring = Marked for review</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="help-section">
            <h3>💾 Auto-Save</h3>
            <ul>
              <li>Your progress is automatically saved</li>
              <li>Answers, notes, and highlights are preserved</li>
              <li>You can safely close and return to the test</li>
            </ul>
          </section>
        </div>

        <div className="help-modal-footer">
          <button className="help-ok-btn" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;