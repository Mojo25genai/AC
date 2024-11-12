import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, Shield, Search, Filter, BookMarked, X } from 'lucide-react';

const PromptLibrary = () => {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: 'Customer Service Response Generator',
      description: 'Generates professional customer service responses based on inquiry type',
      category: 'Customer Service',
      upvotes: 128,
      isApproved: true,
      author: 'Sarah Chen',
      createdAt: '2024-02-15'
    },
    {
      id: 2,
      name: 'Code Documentation Writer',
      description: 'Creates detailed documentation for JavaScript functions and classes',
      category: 'Development',
      upvotes: 89,
      isApproved: true,
      author: 'Mike Johnson',
      createdAt: '2024-02-10'
    },
    {
      id: 3,
      name: 'Marketing Copy Assistant',
      description: 'Helps write compelling marketing copy for various channels',
      category: 'Marketing',
      upvotes: 45,
      isApproved: false,
      author: 'Emma Wilson',
      createdAt: '2024-02-01'
    }
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { name: 'Customer Service', count: 45 },
    { name: 'Development', count: 32 },
    { name: 'Marketing', count: 28 },
    { name: 'Sales', count: 15 },
    { name: 'HR', count: 12 }
  ];

  const filters = [
    { name: 'Most Upvoted', key: 'upvoted' },
    { name: 'Recently Added', key: 'recent' },
    { name: 'Approved Only', key: 'approved' }
  ];

  const handleUpvote = (promptId) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === promptId 
        ? { ...prompt, upvotes: prompt.upvotes + 1 }
        : prompt
    ));
  };

  const toggleFilter = (filterKey) => {
    setActiveFilters(prev => 
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Prompt Library</h1>
          <BookMarked className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
            />
          </div>
          <button 
            className={`px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50 
              ${showFilters ? 'bg-blue-50 border-blue-200' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Quick Filters</h3>
              <div className="flex gap-2 flex-wrap">
                {filters.map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => toggleFilter(filter.key)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1
                      ${activeFilters.includes(filter.key)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {filter.name}
                    {activeFilters.includes(filter.key) && (
                      <X className="w-3 h-3" onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(filter.key);
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1
                      ${selectedCategories.includes(category.name)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category.name} ({category.count})
                    {selectedCategories.includes(category.name) && (
                      <X className="w-3 h-3" onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category.name);
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map(prompt => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between p-4">
              <div>
                <CardTitle className="text-lg font-medium">{prompt.name}</CardTitle>
                <button 
                  onClick={() => toggleCategory(prompt.category)}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                >
                  {prompt.category}
                </button>
              </div>
              {prompt.isApproved && (
                <Shield className="w-5 h-5 text-green-600" title="Approved Prompt" />
              )}
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-gray-600 mb-4">{prompt.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpvote(prompt.id)}
                    className={`flex items-center gap-1 hover:text-blue-600
                      ${prompt.upvoted ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{prompt.upvotes}</span>
                  </button>
                  <span className="text-gray-500">By {prompt.author}</span>
                </div>
                <span className="text-gray-400">{prompt.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;
