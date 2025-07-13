import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Download, Eye, GitFork, ExternalLink, Code, Zap, Shield, Palette, Database, Globe } from 'lucide-react';

interface Library {
  id: string;
  name: string;
  description: string;
  category: string;
  downloads: string;
  stars: string;
  forks: string;
  language: string;
  license: string;
  lastUpdated: string;
  tags: string[];
  githubUrl: string;
  npmUrl?: string;
  featured: boolean;
}

const libraries: Library[] = [
  {
    id: '1',
    name: 'ReactFlow',
    description: 'Highly customizable library for building interactive node-based UIs, editors, flow charts and diagrams.',
    category: 'UI Components',
    downloads: '1.2M',
    stars: '18.5K',
    forks: '1.2K',
    language: 'TypeScript',
    license: 'MIT',
    lastUpdated: '2 days ago',
    tags: ['react', 'flow', 'diagram', 'nodes'],
    githubUrl: 'https://github.com/wbkd/react-flow',
    npmUrl: 'https://npmjs.com/package/reactflow',
    featured: true
  },
  {
    id: '2',
    name: 'Framer Motion',
    description: 'Production-ready motion library for React with declarative animations and layout transitions.',
    category: 'Animation',
    downloads: '3.8M',
    stars: '22.1K',
    forks: '890',
    language: 'TypeScript',
    license: 'MIT',
    lastUpdated: '1 week ago',
    tags: ['animation', 'motion', 'react', 'transitions'],
    githubUrl: 'https://github.com/framer/motion',
    npmUrl: 'https://npmjs.com/package/framer-motion',
    featured: true
  },
  {
    id: '3',
    name: 'Prisma',
    description: 'Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, MariaDB, SQL Server, and more.',
    category: 'Database',
    downloads: '2.1M',
    stars: '36.2K',
    forks: '1.4K',
    language: 'TypeScript',
    license: 'Apache-2.0',
    lastUpdated: '3 days ago',
    tags: ['orm', 'database', 'typescript', 'prisma'],
    githubUrl: 'https://github.com/prisma/prisma',
    npmUrl: 'https://npmjs.com/package/prisma',
    featured: true
  },
  {
    id: '4',
    name: 'Zustand',
    description: 'Small, fast and scalable state-management solution using simplified flux principles.',
    category: 'State Management',
    downloads: '1.9M',
    stars: '42.1K',
    forks: '1.3K',
    language: 'TypeScript',
    license: 'MIT',
    lastUpdated: '5 days ago',
    tags: ['state', 'flux', 'react', 'minimal'],
    githubUrl: 'https://github.com/pmndrs/zustand',
    npmUrl: 'https://npmjs.com/package/zustand',
    featured: false
  },
  {
    id: '5',
    name: 'React Query',
    description: 'Powerful data synchronization for React that makes fetching, caching, and updating server state simple.',
    category: 'Data Fetching',
    downloads: '4.2M',
    stars: '38.9K',
    forks: '2.1K',
    language: 'TypeScript',
    license: 'MIT',
    lastUpdated: '1 week ago',
    tags: ['data-fetching', 'caching', 'react', 'server-state'],
    githubUrl: 'https://github.com/TanStack/query',
    npmUrl: 'https://npmjs.com/package/@tanstack/react-query',
    featured: false
  },
  {
    id: '6',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework packed with classes to build any design, directly in your markup.',
    category: 'Styling',
    downloads: '12.5M',
    stars: '79.2K',
    forks: '4.1K',
    language: 'JavaScript',
    license: 'MIT',
    lastUpdated: '4 days ago',
    tags: ['css', 'utility', 'framework', 'design'],
    githubUrl: 'https://github.com/tailwindlabs/tailwindcss',
    npmUrl: 'https://npmjs.com/package/tailwindcss',
    featured: true
  }
];

const categories = ['All', 'UI Components', 'Animation', 'Database', 'State Management', 'Data Fetching', 'Styling'];

const categoryIcons = {
  'UI Components': Code,
  'Animation': Zap,
  'Database': Database,
  'State Management': Shield,
  'Data Fetching': Globe,
  'Styling': Palette
};

function Libraries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredLibraries = useMemo(() => {
    return libraries.filter(lib => {
      const matchesSearch = lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lib.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lib.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || lib.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredLibraries = libraries.filter(lib => lib.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Library
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"> Showcase</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover and explore the most powerful, modern libraries that shape the future of web development
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">50M+ Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">200K+ Stars</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">TypeScript Ready</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search libraries, technologies, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Libraries */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              Featured Libraries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLibraries.map((library) => (
                <div
                  key={library.id}
                  className="group relative bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {categoryIcons[library.category] && React.createElement(categoryIcons[library.category], {
                        className: "w-6 h-6 text-blue-600"
                      })}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{library.name}</h3>
                        <p className="text-sm text-gray-500">{library.category}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{library.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                        <Download className="w-4 h-4" />
                        <span className="font-bold">{library.downloads}</span>
                      </div>
                      <p className="text-xs text-gray-500">Downloads</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="font-bold">{library.stars}</span>
                      </div>
                      <p className="text-xs text-gray-500">Stars</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                        <GitFork className="w-4 h-4" />
                        <span className="font-bold">{library.forks}</span>
                      </div>
                      <p className="text-xs text-gray-500">Forks</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {library.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={library.githubUrl}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                    {library.npmUrl && (
                      <a
                        href={library.npmUrl}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Libraries */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Libraries' : selectedCategory}
              <span className="text-lg font-normal text-gray-500 ml-3">
                ({filteredLibraries.length} {filteredLibraries.length === 1 ? 'library' : 'libraries'})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredLibraries.map((library) => (
              <div
                key={library.id}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {categoryIcons[library.category] && React.createElement(categoryIcons[library.category], {
                      className: "w-5 h-5 text-blue-600"
                    })}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{library.name}</h3>
                      <p className="text-sm text-gray-500">{library.category}</p>
                    </div>
                  </div>
                  {library.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{library.description}</p>

                <div className="flex items-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-orange-600">
                    <Download className="w-4 h-4" />
                    <span className="font-medium">{library.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{library.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <GitFork className="w-4 h-4" />
                    <span className="font-medium">{library.forks}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {library.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{library.language}</span> • {library.lastUpdated}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={library.githubUrl}
                      className="flex items-center gap-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                    {library.npmUrl && (
                      <a
                        href={library.npmUrl}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLibraries.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No libraries found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Libraries;