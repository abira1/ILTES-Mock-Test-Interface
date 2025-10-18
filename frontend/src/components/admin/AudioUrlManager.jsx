import React, { useState, useEffect } from 'react';
import { X, Volume2, Save, Play, AlertCircle, CheckCircle, Link as LinkIcon, Loader } from 'lucide-react';
import ExamFirebaseService from '../../services/ExamFirebaseService';
import { useToast } from '../common/Toast';

export function AudioUrlManager({ onClose }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExamId, setEditingExamId] = useState(null);
  const [newAudioUrl, setNewAudioUrl] = useState('');
  const [testingAudio, setTestingAudio] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const publishedExams = await ExamFirebaseService.getPublishedExams();
      
      // Filter for listening exams only (they have audio)
      const listeningExams = publishedExams.filter(exam => 
        exam.type === 'listening' || exam.audioUrl
      );
      
      setExams(listeningExams);
    } catch (error) {
      console.error('Error loading exams:', error);
      showToast('Failed to load exams', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exam) => {
    setEditingExamId(exam.id);
    setNewAudioUrl(exam.audioUrl || '');
  };

  const handleCancelEdit = () => {
    setEditingExamId(null);
    setNewAudioUrl('');
  };

  const testAudioUrl = () => {
    if (!newAudioUrl.trim()) {
      showToast('Please enter an audio URL first', 'error');
      return;
    }

    try {
      setTestingAudio(true);
      const audio = new Audio(newAudioUrl);
      
      audio.addEventListener('canplaythrough', () => {
        showToast('Audio URL is valid and playable!', 'success');
        setTestingAudio(false);
        audio.pause();
      });

      audio.addEventListener('error', () => {
        showToast('Invalid audio URL or file cannot be loaded', 'error');
        setTestingAudio(false);
      });

      audio.load();
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (testingAudio) {
          setTestingAudio(false);
          showToast('Audio test timeout - check if URL is accessible', 'error');
        }
      }, 10000);
    } catch (error) {
      setTestingAudio(false);
      showToast('Error testing audio: ' + error.message, 'error');
    }
  };

  const handleSave = async (examId) => {
    if (!newAudioUrl.trim()) {
      showToast('Audio URL cannot be empty', 'error');
      return;
    }

    try {
      setSaving(true);
      await ExamFirebaseService.updateAudioUrl(examId, newAudioUrl);
      
      // Update local state
      setExams(exams.map(exam => 
        exam.id === examId ? { ...exam, audioUrl: newAudioUrl } : exam
      ));
      
      showToast('Audio URL updated successfully!', 'success');
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating audio URL:', error);
      showToast('Failed to update audio URL: ' + error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-teal-600">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Audio URL Management</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : exams.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Volume2 className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No listening exams found</p>
              <p className="text-sm mt-2">Import a listening exam to manage audio URLs</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Audio URL Requirements</p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                    <li>Must be a direct link to an audio file (MP3, WAV, OGG, M4A)</li>
                    <li>URL must be publicly accessible (no authentication required)</li>
                    <li>Use "Test Audio" to verify the URL works before saving</li>
                  </ul>
                </div>
              </div>

              {exams.map((exam) => (
                <div key={exam.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{exam.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <span className="font-medium">Type:</span>
                            <span className="ml-1 capitalize">{exam.type}</span>
                          </span>
                          <span className="flex items-center">
                            <span className="font-medium">Duration:</span>
                            <span className="ml-1">{formatDuration(exam.duration)}</span>
                          </span>
                          <span className="flex items-center">
                            <span className="font-medium">Questions:</span>
                            <span className="ml-1">{exam.totalQuestions || 40}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {editingExamId === exam.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Audio URL
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="url"
                              value={newAudioUrl}
                              onChange={(e) => setNewAudioUrl(e.target.value)}
                              placeholder="https://example.com/audio.mp3"
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={testAudioUrl}
                            disabled={testingAudio || !newAudioUrl.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
                          >
                            {testingAudio ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Testing...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Test Audio</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleSave(exam.id)}
                            disabled={saving || !newAudioUrl.trim()}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
                          >
                            {saving ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Audio URL</p>
                          {exam.audioUrl ? (
                            <div className="flex items-center space-x-2">
                              <LinkIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <a 
                                href={exam.audioUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline truncate flex-1"
                              >
                                {exam.audioUrl}
                              </a>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No audio URL set</p>
                          )}
                        </div>

                        <button
                          onClick={() => handleEdit(exam)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Change Audio URL</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
