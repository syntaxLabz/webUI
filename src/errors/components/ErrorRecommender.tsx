import React, { useState } from 'react';
import { useMemo } from 'react';
import { errorsDatabase, predefinedScenarios } from '../data/errorsDatabase';
import { Lightbulb, Zap, Star, Copy, Check, Shuffle, Search } from 'lucide-react';
import type { ErrorType } from '../data/errorsDatabase';

interface ErrorRecommenderProps {
  setSelectedError: (error: ErrorType | null) => void;
  searchTerm?: string;
}

interface Recommendation {
  error: ErrorType;
  confidence: number;
  reasoning: string;
}

export default function ErrorRecommender({ setSelectedError, searchTerm = '' }: ErrorRecommenderProps) {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter errors based on search term for quick access
  const filteredErrors = useMemo(() => {
    if (!searchTerm) return [];
    
    const term = searchTerm.toLowerCase();
    return Object.values(errorsDatabase).filter(error => 
      error.name.toLowerCase().includes(term) ||
      error.description.toLowerCase().includes(term) ||
      error.keywords.some(keyword => keyword.toLowerCase().includes(term))
    ).slice(0, 6); // Show max 6 results
  }, [searchTerm]);

  const analyzeInput = async () => {
    if (!userInput.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const input = userInput.toLowerCase();
    const recommendations: Recommendation[] = [];

    // Analyze input for keywords and context
    Object.values(errorsDatabase).forEach(error => {
      let confidence = 0;
      const reasons: string[] = [];

      // Check for direct keyword matches
      error.keywords.forEach(keyword => {
        if (input.includes(keyword)) {
          confidence += 30;
          reasons.push(`Matches keyword: "${keyword}"`);
        }
      });

      // Check for scenario matches
      error.commonScenarios.forEach(scenario => {
        const scenarioWords = scenario.toLowerCase().split(' ');
        const matchedWords = scenarioWords.filter(word => input.includes(word));
        if (matchedWords.length >= 2) {
          confidence += 25;
          reasons.push(`Matches scenario pattern`);
        }
      });

      // Context-specific analysis
      if (input.includes('missing') || input.includes('required') || input.includes('empty')) {
        if (error.name === 'MissingParameter') {
          confidence += 40;
          reasons.push('Indicates missing required field');
        }
      }

      if (input.includes('invalid') || input.includes('format') || input.includes('wrong')) {
        if (error.name === 'InvalidParameter') {
          confidence += 40;
          reasons.push('Indicates validation error');
        }
      }

      if (input.includes('token') || input.includes('auth') || input.includes('login')) {
        if (error.category === 'authentication') {
          confidence += 35;
          reasons.push('Authentication-related context');
        }
      }

      if (input.includes('permission') || input.includes('access') || input.includes('admin')) {
        if (error.name === 'Forbidden') {
          confidence += 40;
          reasons.push('Permission/access control context');
        }
      }

      if (input.includes('not found') || input.includes('doesn\'t exist') || input.includes('missing')) {
        if (error.name === 'NotFound') {
          confidence += 40;
          reasons.push('Resource not found context');
        }
      }

      if (input.includes('already exists') || input.includes('duplicate') || input.includes('taken')) {
        if (error.name === 'Conflict') {
          confidence += 40;
          reasons.push('Duplicate resource context');
        }
      }

      if (input.includes('rate') || input.includes('limit') || input.includes('too many')) {
        if (error.name === 'RateLimited') {
          confidence += 40;
          reasons.push('Rate limiting context');
        }
      }

      if (input.includes('server') || input.includes('database') || input.includes('connection')) {
        if (error.category === 'server') {
          confidence += 35;
          reasons.push('Server/infrastructure context');
        }
      }

      if (confidence > 0) {
        recommendations.push({
          error,
          confidence: Math.min(confidence, 95), // Cap at 95%
          reasoning: reasons.join(', ')
        });
      }
    });

    // Sort by confidence and take top 3
    const sortedRecommendations = recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);

    setRecommendations(sortedRecommendations);
    setIsAnalyzing(false);
  };

  const loadPredefinedScenario = (scenario: typeof predefinedScenarios[0]) => {
    setUserInput(scenario.input);
    setRecommendations([]);
  };

  const getRandomScenario = () => {
    const randomScenario = predefinedScenarios[Math.floor(Math.random() * predefinedScenarios.length)];
    loadPredefinedScenario(randomScenario);
  };

  const copyToClipboard = async (text: string, errorName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(errorName);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400 bg-green-900';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-900';
    return 'text-orange-400 bg-orange-900';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Error Recommender</h2>
        <p className="text-gray-400 text-lg">
          Describe your error scenario and get intelligent recommendations for the most appropriate error types
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="scenario-input" className="text-lg font-medium text-white">
              Describe Your Error Scenario
            </label>
            <div className="flex space-x-2">
              <button
                onClick={getRandomScenario}
                className="flex items-center space-x-1 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm text-white transition-colors"
              >
                <Shuffle size={14} />
                <span>Random Example</span>
              </button>
            </div>
          </div>

          <textarea
            id="scenario-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Example: User is trying to register but didn't provide an email address..."
            className="w-full h-32 bg-gray-900 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={analyzeInput}
              disabled={!userInput.trim() || isAnalyzing}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Analyze Scenario</span>
                </>
              )}
            </button>

            <div className="text-sm text-gray-400">
              {userInput.length}/500 characters
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && filteredErrors.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Search size={20} className="mr-2 text-blue-400" />
            Search Results for "{searchTerm}"
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredErrors.map((error) => (
              <div
                key={error.name}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => setSelectedError(error)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{error.name}</h4>
                  <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                    {error.httpStatus}
                  </span>
                </div>
                <p className="text-gray-300 text-xs line-clamp-2">{error.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predefined Examples */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <Lightbulb size={20} className="mr-2 text-yellow-400" />
          Quick Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predefinedScenarios.slice(0, 6).map((scenario, index) => (
            <button
              key={index}
              onClick={() => loadPredefinedScenario(scenario)}
              className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="font-medium text-white text-sm mb-1">{scenario.title}</div>
              <div className="text-gray-400 text-xs">{scenario.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white text-center">Recommended Error Types</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div
                key={rec.error.name}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedError(rec.error)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i === 0 ? 'text-yellow-400' : 
                            i === 1 && index <= 1 ? 'text-yellow-400' : 
                            i === 2 && index === 0 ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                      {rec.confidence}% match
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-white mb-2">{rec.error.name}</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium">
                    {rec.error.httpStatus}
                  </span>
                  <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium">
                    {rec.error.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{rec.error.description}</p>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-1">Why this fits:</h5>
                  <p className="text-gray-400 text-xs line-clamp-3">{rec.reasoning}</p>
                </div>

                <div className="bg-gray-900 rounded border border-gray-600 p-3 mb-4 overflow-hidden">
                  <code className="text-green-400 text-xs font-mono break-all">{rec.error.codeSnippet}</code>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(rec.error.codeSnippet, rec.error.name);
                    }}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedCode === rec.error.name ? (
                      <>
                        <Check size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedError(rec.error);
                    }}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs text-white transition-colors flex-1 justify-center"
                  >
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Analyzing your scenario for the best error recommendations...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}