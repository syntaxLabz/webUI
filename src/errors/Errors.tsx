import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ErrorExplorer from './components/ErrorExplorer';
import ErrorRecommender from './components/ErrorRecommender';
import CodeGenerator from './components/CodeGenerator';
import JSONPreviewer from './components/JSONPreviewer';
import BestPracticesGuide from './components/BestPracticesGuide';
import type { ErrorType } from './data/errorsDatabase';

function Errors() {
  const [activeTab, setActiveTab] = useState('explorer');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedError, setSelectedError] = useState<ErrorType | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'explorer':
        return (
          <ErrorExplorer
            searchTerm={searchTerm}
            selectedError={selectedError}
            setSelectedError={setSelectedError}
          />
        );
      case 'recommender':
        return (
          <ErrorRecommender 
            setSelectedError={setSelectedError}
            searchTerm={searchTerm}
          />
        );
      case 'generator':
        return <CodeGenerator searchTerm={searchTerm} />;
      case 'guide':
        return <BestPracticesGuide />;
      default:
        return (
          <ErrorExplorer
            searchTerm={searchTerm}
            selectedError={selectedError}
            setSelectedError={setSelectedError}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>

      {/* JSON Previewer - Only show when not in explorer or recommender tabs */}
      {!['explorer', 'recommender'].includes(activeTab) && selectedError && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm">
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-2xl backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h4 className="text-white font-medium flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Quick Preview
              </h4>
              <button
                onClick={() => setSelectedError(null)}
                className="text-gray-400 hover:text-white hover:bg-gray-700 rounded p-1 transition-colors"
                aria-label="Close preview"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-white font-medium">{selectedError.name}</span>
                <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                  {selectedError.httpStatus}
                </span>
              </div>
              <div className="bg-gray-900 rounded border border-gray-600 p-3 max-h-48 overflow-y-auto">
                <pre className="text-blue-400 text-xs">
                  <code>{JSON.stringify(selectedError.jsonResponse, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="w-96 h-96 bg-gradient-to-tr from-green-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Errors;