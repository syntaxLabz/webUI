import React, { useState, useMemo } from 'react';
import { errorsDatabase } from '../data/errorsDatabase';
import { Copy, Check, Eye, Code2, Filter, SortAsc } from 'lucide-react';
import type { ErrorType } from '../data/errorsDatabase';

interface ErrorExplorerProps {
  searchTerm: string;
  selectedError: ErrorType | null;
  setSelectedError: (error: ErrorType | null) => void;
}

export default function ErrorExplorer({ 
  searchTerm, 
  selectedError, 
  setSelectedError 
}: ErrorExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Errors', count: Object.keys(errorsDatabase).length },
    { id: 'validation', label: 'Validation', count: Object.values(errorsDatabase).filter(e => e.category === 'validation').length },
    { id: 'authentication', label: 'Authentication', count: Object.values(errorsDatabase).filter(e => e.category === 'authentication').length },
    { id: 'resource', label: 'Resource', count: Object.values(errorsDatabase).filter(e => e.category === 'resource').length },
    { id: 'server', label: 'Server', count: Object.values(errorsDatabase).filter(e => e.category === 'server').length },
  ];

  const filteredErrors = useMemo(() => {
    let errors = Object.values(errorsDatabase);

    // Filter by category
    if (selectedCategory !== 'all') {
      errors = errors.filter(error => error.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      errors = errors.filter(error => 
        error.name.toLowerCase().includes(term) ||
        error.description.toLowerCase().includes(term) ||
        error.usage.toLowerCase().includes(term) ||
        error.keywords.some(keyword => keyword.toLowerCase().includes(term))
      );
    }

    // Sort
    errors.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.httpStatus - b.httpStatus;
      }
    });

    return errors;
  }, [selectedCategory, searchTerm, sortBy]);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 300 && status < 400) return 'bg-yellow-500';
    if (status >= 400 && status < 500) return 'bg-red-500';
    return 'bg-purple-500';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'validation': return 'bg-blue-500';
      case 'authentication': return 'bg-orange-500';
      case 'resource': return 'bg-green-500';
      case 'server': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Filters and Error Grid */}
      <div className="lg:col-span-2">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SortAsc size={16} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'status')}
                className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status Code</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-400">
              {filteredErrors.length} error{filteredErrors.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Error Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredErrors.map((error) => (
            <div
              key={error.name}
              className={`bg-gray-800 rounded-lg border transition-all duration-300 cursor-pointer hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 ${
                selectedError?.name === error.name ? 'border-blue-500 shadow-lg' : 'border-gray-700'
              }`}
              onClick={() => setSelectedError(error)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">{error.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(error.httpStatus)}`}>
                      {error.httpStatus}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(error.category)}`}>
                    {error.category}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{error.description}</p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(error.codeSnippet, error.name);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedCode === error.name ? (
                      <>
                        <Check size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedError(error);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs text-white transition-colors"
                  >
                    <Eye size={12} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-16">
            <Filter size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No errors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Error Details Panel */}
      <div className="lg:col-span-1">
        {selectedError ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{selectedError.name}</h3>
              <span className={`px-3 py-1 rounded text-sm font-medium text-white ${getStatusColor(selectedError.httpStatus)}`}>
                {selectedError.httpStatus}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                <p className="text-gray-400 text-sm">{selectedError.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">When to Use</h4>
                <p className="text-gray-400 text-sm">{selectedError.usage}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Example Usage</h4>
                <div className="bg-gray-900 rounded border border-gray-600 p-3 overflow-x-auto">
                  <code className="text-green-400 text-xs font-mono break-all">{selectedError.codeSnippet}</code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">JSON Response</h4>
                <div className="bg-gray-900 rounded border border-gray-600 p-3 overflow-x-auto">
                  <pre className="text-blue-400 text-xs font-mono overflow-x-auto">
                    {JSON.stringify(selectedError.jsonResponse, null, 2)}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Common Scenarios</h4>
                <ul className="space-y-1">
                  {selectedError.commonScenarios.map((scenario, index) => (
                    <li key={index} className="text-gray-400 text-xs flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center sticky top-24">
            <Code2 size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">Select an Error</h3>
            <p className="text-gray-500 text-sm">Click on any error card to view detailed information and examples</p>
          </div>
        )}
      </div>
    </div>
  );
}