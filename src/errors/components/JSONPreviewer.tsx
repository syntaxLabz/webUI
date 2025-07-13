import React, { useState, useEffect } from 'react';
import { errorsDatabase } from '../data/errorsDatabase';
import { Download, Copy, Check, Eye, Code } from 'lucide-react';
import type { ErrorType } from '../data/errorsDatabase';

interface JSONPreviewerProps {
  selectedError: ErrorType | null;
}

export default function JSONPreviewer({ selectedError }: JSONPreviewerProps) {
  const [customMessage, setCustomMessage] = useState('');
  const [customField, setCustomField] = useState('');
  const [previewJson, setPreviewJson] = useState<any>(null);
  const [formatted, setFormatted] = useState(true);
  const [copiedJson, setCopiedJson] = useState(false);

  useEffect(() => {
    if (selectedError) {
      updatePreview();
    }
  }, [selectedError, customMessage, customField]);

  const updatePreview = () => {
    if (!selectedError) return;

    let json = { ...selectedError.jsonResponse };
    
    // Apply custom message if provided
    if (customMessage.trim()) {
      const errorName = selectedError.name.toLowerCase().replace(/([A-Z])/g, '_$1').slice(1);
      json.message = `${json.error}: ${customMessage}`;
    }

    // Add custom field if provided
    if (customField.trim()) {
      json.field = customField;
    }

    setPreviewJson(json);
  };

  const copyToClipboard = async () => {
    try {
      const jsonString = formatted 
        ? JSON.stringify(previewJson, null, 2)
        : JSON.stringify(previewJson);
      await navigator.clipboard.writeText(jsonString);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadJson = () => {
    if (!previewJson) return;
    
    const jsonString = JSON.stringify(previewJson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedError?.name || 'error'}-response.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allErrors = Object.values(errorsDatabase);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">JSON Response Previewer</h2>
        <p className="text-gray-400 text-lg">
          Preview and customize JSON error responses in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Selection and Customization */}
        <div className="space-y-6">
          {/* Error Selection */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Select Error Type</h3>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {allErrors.map((error) => (
                <button
                  key={error.name}
                  onClick={() => setPreviewJson(error.jsonResponse)}
                  className={`text-left p-3 rounded border transition-colors ${
                    selectedError?.name === error.name
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{error.name}</span>
                    <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                      {error.httpStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{error.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Customization Panel */}
          {selectedError && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-4">Customize Response</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Message
                  </label>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter custom error message..."
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Field (optional)
                  </label>
                  <input
                    type="text"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                    placeholder="e.g., email, password, username..."
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setCustomMessage('');
                      setCustomField('');
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="formatted"
                      checked={formatted}
                      onChange={(e) => setFormatted(e.target.checked)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="formatted" className="text-sm text-gray-300">
                      Pretty Format
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Quick Examples</h3>
            <div className="space-y-2">
              {[
                { error: 'MissingParameter', field: 'email', message: 'Email address is required for registration' },
                { error: 'InvalidParameter', field: 'age', message: 'Age must be between 18 and 120' },
                { error: 'Unauthorized', field: '', message: 'JWT token has expired' },
                { error: 'Forbidden', field: '', message: 'Admin privileges required' },
                { error: 'NotFound', field: 'user_id', message: 'User with ID 12345 not found' },
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const error = errorsDatabase[example.error];
                    if (error) {
                      setPreviewJson(error.jsonResponse);
                      setCustomMessage(example.message);
                      setCustomField(example.field);
                    }
                  }}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  <div className="font-medium text-white text-sm">{example.error}</div>
                  <div className="text-gray-400 text-xs mt-1">{example.message}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* JSON Preview */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Eye size={20} className="mr-2" />
                JSON Response Preview
              </h3>
              
              {previewJson && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedJson ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={downloadJson}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm text-white transition-colors"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4">
              {previewJson ? (
                <pre className="text-sm text-blue-400 overflow-x-auto bg-gray-900 rounded border border-gray-600 p-4 max-h-96 overflow-y-auto">
                  <code>
                    {formatted 
                      ? JSON.stringify(previewJson, null, 2)
                      : JSON.stringify(previewJson)
                    }
                  </code>
                </pre>
              ) : (
                <div className="text-center py-12">
                  <Code size={48} className="mx-auto text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No Error Selected</h3>
                  <p className="text-gray-500">Select an error type to preview its JSON response</p>
                </div>
              )}
            </div>
          </div>

          {/* Response Details */}
          {selectedError && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-4">Response Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">HTTP Status:</span>
                  <span className="px-2 py-1 bg-red-500 text-white rounded text-sm font-medium">
                    {selectedError.httpStatus}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm font-medium">
                    {selectedError.category}
                  </span>
                </div>
                
                <div>
                  <span className="text-gray-300">Content-Type:</span>
                  <span className="text-gray-400 ml-2">application/json</span>
                </div>
                
                <div>
                  <span className="text-gray-300">Size:</span>
                  <span className="text-gray-400 ml-2">
                    {new Blob([JSON.stringify(previewJson)]).size} bytes
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* cURL Example */}
          {selectedError && previewJson && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-4">cURL Example</h3>
              <div className="bg-gray-900 rounded border border-gray-600 p-4">
                <pre className="text-sm text-green-400 overflow-x-auto">
                  <code>
{`# Example API response
curl -X POST https://api.example.com/endpoint \\
  -H "Content-Type: application/json" \\
  -d '{"data": "invalid"}'

# Response: ${selectedError.httpStatus}
${JSON.stringify(previewJson, null, 2)}`}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}