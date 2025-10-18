import React, { useState } from 'react';
import { X, Upload, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import BackendService from '../../services/BackendService';
import { useToast } from '../common/Toast';

export function ExamJsonImport({ onClose, onImportSuccess }) {
  const [jsonText, setJsonText] = useState('');
  const [validationError, setValidationError] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [importing, setImporting] = useState(false);
  const { showToast } = useToast();

  const validateAndPreview = () => {
    try {
      setValidationError('');
      setPreviewData(null);

      // Parse JSON
      const examData = JSON.parse(jsonText);

      // Validate required fields (support both old and new format)
      const testType = examData.test_type || examData.type;
      if (!testType) {
        throw new Error('Missing required field: test_type (listening, reading, or writing)');
      }

      if (!examData.title) {
        throw new Error('Missing required field: title');
      }

      const duration = examData.duration_seconds || examData.duration;
      if (!duration) {
        throw new Error('Missing required field: duration_seconds');
      }

      if (!examData.sections || !Array.isArray(examData.sections)) {
        throw new Error('Missing or invalid field: sections (must be an array)');
      }

      // Validate sections
      let totalQuestions = 0;
      examData.sections.forEach((section, index) => {
        if (!section.title) {
          throw new Error(`Section ${index + 1}: Missing title`);
        }
        if (!section.questions || !Array.isArray(section.questions)) {
          throw new Error(`Section ${index + 1}: Missing or invalid questions array`);
        }
        section.questions.forEach((question, qIndex) => {
          if (!question.type) {
            throw new Error(`Section ${index + 1}, Question ${qIndex + 1}: Missing type`);
          }
          // Note: Auto-import doesn't require 'payload', it auto-detects from other fields
        });
        totalQuestions += section.questions.length;
      });

      // Create preview
      setPreviewData({
        type: testType,
        title: examData.title,
        duration: duration,
        audioUrl: examData.audio_url || examData.audioUrl || 'Not specified',
        sectionCount: examData.sections.length,
        totalQuestions,
        sections: examData.sections.map((section, idx) => ({
          index: idx + 1,
          title: section.title,
          questionCount: section.questions.length,
          questionTypes: [...new Set(section.questions.map(q => q.type))].join(', ')
        }))
      });

      showToast('JSON validation successful!', 'success');
    } catch (error) {
      setValidationError(error.message);
      showToast('Validation failed. Please check the JSON format.', 'error');
    }
  };

  const handleImport = async () => {
    if (!previewData) {
      showToast('Please validate JSON first', 'error');
      return;
    }

    try {
      setImporting(true);
      const examData = JSON.parse(jsonText);
      
      // Convert to File/Blob for backend upload
      const jsonBlob = new Blob([jsonText], { type: 'application/json' });
      const jsonFile = new File([jsonBlob], 'exam.json', { type: 'application/json' });
      
      // Import via backend auto-import API
      const result = await BackendService.importExamFromJson(jsonFile);
      
      if (result.status === 'success' || result.status === 'failed') {
        const message = result.status === 'success'
          ? `Exam imported successfully! ${result.summary.questions_created} questions created.`
          : `Import had issues. Check details.`;
        
        showToast(message, result.status === 'success' ? 'success' : 'warning');
        
        // Show warnings if any
        if (result.warnings && result.warnings.length > 0) {
          console.warn('Import warnings:', result.warnings);
        }
        
        // Notify parent component
        if (onImportSuccess && result.exam_id) {
          onImportSuccess(result.exam_id);
        }
        
        // Close modal after 1 second if successful
        if (result.status === 'success') {
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Import error:', error);
      showToast('Failed to import exam: ' + error.message, 'error');
    } finally {
      setImporting(false);
    }
  };

  const loadSampleJson = (type) => {
    let sampleJson = {};
    
    if (type === 'listening') {
      sampleJson = {
        id: 'sample-listening-test-1',
        type: 'listening',
        title: 'Sample IELTS Listening Test',
        duration: 2400,
        audioUrl: 'https://example.com/audio.mp3',
        sections: [
          {
            index: 1,
            title: 'Section 1',
            questions: [
              {
                index: 1,
                type: 'fill_in_gaps',
                instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
                payload: {
                  prompt: 'Name: ____',
                  blanks: [
                    { correctAnswer: 'John', maxLength: 20 }
                  ]
                }
              }
            ]
          }
        ]
      };
    } else if (type === 'reading') {
      sampleJson = {
        id: 'sample-reading-test-1',
        type: 'reading',
        title: 'Sample IELTS Reading Test',
        duration: 3600,
        sections: [
          {
            index: 1,
            title: 'Passage 1',
            passageText: 'This is the reading passage text...',
            questions: [
              {
                index: 1,
                type: 'multiple_choice_single',
                instructions: 'Choose the correct letter, A, B, C or D.',
                payload: {
                  prompt: 'What is the main idea?',
                  options: [
                    { label: 'A', text: 'Option A' },
                    { label: 'B', text: 'Option B' },
                    { label: 'C', text: 'Option C' },
                    { label: 'D', text: 'Option D' }
                  ],
                  correctAnswer: 'A'
                }
              }
            ]
          }
        ]
      };
    } else if (type === 'writing') {
      sampleJson = {
        id: 'sample-writing-test-1',
        type: 'writing',
        title: 'Sample IELTS Writing Test',
        duration: 3600,
        sections: [
          {
            index: 1,
            title: 'Writing Task 1',
            questions: [
              {
                index: 1,
                type: 'writing_task_1',
                instructions: 'You should spend about 20 minutes on this task.',
                payload: {
                  prompt: 'The chart shows... Summarize the information.',
                  minWords: 150,
                  taskNumber: 1,
                  chartImage: 'https://example.com/chart.png'
                }
              }
            ]
          },
          {
            index: 2,
            title: 'Writing Task 2',
            questions: [
              {
                index: 2,
                type: 'writing_task_2',
                instructions: 'You should spend about 40 minutes on this task.',
                payload: {
                  prompt: 'Some people believe... Discuss both views and give your opinion.',
                  minWords: 250,
                  taskNumber: 2
                }
              }
            ]
          }
        ]
      };
    }
    
    setJsonText(JSON.stringify(sampleJson, null, 2));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center space-x-3">
            <Upload className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Import Exam from JSON</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - JSON Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exam JSON Data
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Paste your exam JSON here. Must include: type, title, duration, sections with questions.
                </p>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder='{\n  "type": "listening",\n  "title": "IELTS Listening Test 1",\n  ...\n}'
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Sample JSON Buttons */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Load Sample JSON:</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadSampleJson('listening')}
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium"
                  >
                    Listening
                  </button>
                  <button
                    onClick={() => loadSampleJson('reading')}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                  >
                    Reading
                  </button>
                  <button
                    onClick={() => loadSampleJson('writing')}
                    className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm font-medium"
                  >
                    Writing
                  </button>
                </div>
              </div>

              {/* Validation Error */}
              {validationError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Validation Error</p>
                    <p className="text-sm text-red-700 mt-1">{validationError}</p>
                  </div>
                </div>
              )}

              {/* Validate Button */}
              <button
                onClick={validateAndPreview}
                disabled={!jsonText.trim()}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>Validate & Preview</span>
              </button>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Validate JSON to see exam preview before importing.
                </p>
              </div>

              {previewData ? (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Validation Successful!</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Exam Type</p>
                      <p className="text-lg font-bold text-gray-800 capitalize">{previewData.type}</p>
                    </div>

                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Title</p>
                      <p className="text-lg font-semibold text-gray-800">{previewData.title}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                        <p className="text-lg font-bold text-blue-600">{previewData.duration}s</p>
                      </div>
                      <div className="bg-white rounded p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Questions</p>
                        <p className="text-lg font-bold text-blue-600">{previewData.totalQuestions}</p>
                      </div>
                    </div>

                    {previewData.audioUrl !== 'Not specified' && (
                      <div className="bg-white rounded p-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Audio URL</p>
                        <p className="text-sm text-gray-700 truncate">{previewData.audioUrl}</p>
                      </div>
                    )}

                    <div className="bg-white rounded p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Sections ({previewData.sectionCount})
                      </p>
                      <div className="space-y-2">
                        {previewData.sections.map((section) => (
                          <div key={section.index} className="p-2 bg-gray-50 rounded border border-gray-200">
                            <p className="text-sm font-semibold text-gray-800">{section.title}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {section.questionCount} questions: {section.questionTypes}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Import Button */}
                  <button
                    onClick={handleImport}
                    disabled={importing}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-bold flex items-center justify-center space-x-2"
                  >
                    {importing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Importing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Import to Firebase</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Preview will appear here after validation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
