import React, { useEffect, useState, useCallback } from 'react';

const TextHighlighter = ({ contentRef, highlights, onHighlightsChange, onCreateNote }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);

  const colors = [
    { name: 'yellow', value: 'rgba(255, 255, 0, 0.3)' },
    { name: 'green', value: 'rgba(0, 255, 0, 0.2)' },
    { name: 'blue', value: 'rgba(0, 100, 255, 0.2)' },
    { name: 'pink', value: 'rgba(255, 192, 203, 0.4)' }
  ];

  const handleTextSelection = useCallback((e) => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      
      // Check if selection is within content area
      const content = contentRef.current;
      if (content && content.contains(range.commonAncestorContainer)) {
        setSelectedText(text);
        setSelectedRange(range);
        setContextMenu({
          x: e.clientX,
          y: e.clientY
        });
      }
    } else {
      setContextMenu(null);
    }
  }, [contentRef]);

  const applyHighlight = useCallback((color) => {
    if (!selectedRange) return;

    try {
      const span = document.createElement('span');
      span.className = `highlight highlight-${color.name}`;
      span.style.backgroundColor = color.value;
      span.setAttribute('data-highlight-id', Date.now().toString());
      
      selectedRange.surroundContents(span);

      // Save highlight
      const newHighlight = {
        id: Date.now(),
        text: selectedText,
        color: color.name,
        timestamp: new Date().toISOString()
      };

      onHighlightsChange([...highlights, newHighlight]);

    } catch (error) {
      console.error('Failed to apply highlight:', error);
    }

    setContextMenu(null);
    window.getSelection().removeAllRanges();
  }, [selectedRange, selectedText, highlights, onHighlightsChange]);

  const handleCreateNote = useCallback(() => {
    if (contextMenu && selectedText) {
      onCreateNote(selectedText, contextMenu.x, contextMenu.y);
      setContextMenu(null);
      window.getSelection().removeAllRanges();
    }
  }, [contextMenu, selectedText, onCreateNote]);

  const handleRemoveHighlight = useCallback((e) => {
    const target = e.target;
    if (target.classList.contains('highlight')) {
      const highlightId = target.getAttribute('data-highlight-id');
      
      // Remove the highlight span and replace with text
      const parent = target.parentNode;
      const text = target.textContent;
      parent.replaceChild(document.createTextNode(text), target);

      // Remove from state
      onHighlightsChange(
        highlights.filter(h => h.id.toString() !== highlightId)
      );
    }
  }, [highlights, onHighlightsChange]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Listen for text selection
    document.addEventListener('mouseup', handleTextSelection);
    
    // Listen for clicks outside context menu
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest('.highlight-context-menu')) {
        setContextMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Listen for right-click on highlights
    const handleRightClick = (e) => {
      if (e.target.classList.contains('highlight')) {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          removeHighlight: () => handleRemoveHighlight(e)
        });
      }
    };
    content.addEventListener('contextmenu', handleRightClick);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('click', handleClickOutside);
      content.removeEventListener('contextmenu', handleRightClick);
    };
  }, [contentRef, contextMenu, handleTextSelection, handleRemoveHighlight]);

  if (!contextMenu) return null;

  return (
    <div
      className="highlight-context-menu"
      style={{
        position: 'fixed',
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`,
        zIndex: 10000
      }}
    >
      {contextMenu.removeHighlight ? (
        <button
          className="context-menu-item remove"
          onClick={contextMenu.removeHighlight}
        >
          Remove Highlight
        </button>
      ) : (
        <>
          <div className="context-menu-label">Highlight:</div>
          {colors.map(color => (
            <button
              key={color.name}
              className={`context-menu-item color-${color.name}`}
              style={{ backgroundColor: color.value }}
              onClick={() => applyHighlight(color)}
            >
              {color.name}
            </button>
          ))}
          <button
            className="context-menu-item create-note"
            onClick={handleCreateNote}
          >
            📝 Create Note
          </button>
        </>
      )}
    </div>
  );
};

export default TextHighlighter;