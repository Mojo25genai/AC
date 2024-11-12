import React, { useState } from 'react';
import { 
  Shield,
  ArrowRight,
  Check,
  AlertCircle,
  X,
  Copy,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AppWithNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState('prompt-builder');
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fabric prompts organized by category
  const fabricPrompts = {
    analysis: [
      { id: 'analyze-code', label: 'Analyze code for security issues', description: 'Perform security analysis of code' },
      { id: 'analyze-architecture', label: 'Analyze system architecture', description: 'Review system design' },
      { id: 'analyze-text', label: 'Analyze text for key insights', description: 'Extract main points from text' }
    ],
    creation: [
      { id: 'create-content', label: 'Create content from outline', description: 'Generate detailed content' },
      { id: 'write-code', label: 'Write code implementation', description: 'Generate code based on requirements' },
      { id: 'create-test', label: 'Create test cases', description: 'Generate test scenarios' }
    ],
    improvement: [
      { id: 'improve-writing', label: 'Improve writing clarity', description: 'Enhance text quality' },
      { id: 'optimize-code', label: 'Optimize code performance', description: 'Improve code efficiency' },
      { id: 'enhance-security', label: 'Enhance security controls', description: 'Strengthen security measures' }
    ],
    learning: [
      { id: 'explain-concept', label: 'Explain technical concept', description: 'Detailed concept explanation' },
      { id: 'create-tutorial', label: 'Create step-by-step tutorial', description: 'Generate learning materials' },
      { id: 'summarize-topic', label: 'Summarize complex topic', description: 'Topic simplification' }
    ]
  };

  // Navigation configuration
  const navigationItems = [
    { 
      id: 'prompt-builder',
      label: 'Prompt Builder',
      icon: Shield,
      count: 12,
      description: 'Build structured prompts'
    },
    {
      id: 'prompt-testing',
      label: 'Prompt Testing',
      icon: Check,
      count: 8,
      description: 'Test and debug prompts'
    },
    {
      id: 'benchmark',
      label: 'Benchmark Results',
      icon: Shield,
      count: 5,
      description: 'View model performance'
    }
  ];

  // Screen content render
  const renderScreen = () => {
    switch(currentScreen) {
      case 'prompt-builder':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Prompt Builder</h1>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">As a...</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Select role</option>
                      <option value="developer">Developer</option>
                      <option value="analyst">Security Analyst</option>
                      <option value="architect">System Architect</option>
                      <option value="writer">Technical Writer</option>
                    </select>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">I want to... (Category)</label>
                    <select 
                      className="w-full p-2 border rounded-md mb-4"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="analysis">Analysis & Review</option>
                      <option value="creation">Creation & Generation</option>
                      <option value="improvement">Improvement & Optimization</option>
                      <option value="learning">Learning & Documentation</option>
                    </select>

                    {/* Prompt Selection */}
                    {selectedCategory && (
                      <select className="w-full p-2 border rounded-md">
                        <option value="">Select specific task</option>
                        {fabricPrompts[selectedCategory].map(prompt => (
                          <option key={prompt.id} value={prompt.id}>
                            {prompt.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Goal Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">So that... (Specific Goal)</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your specific goal or outcome"
                    />
                  </div>

                  {/* Output Format */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Select output format</option>
                      <option value="text">Detailed Text</option>
                      <option value="bullet">Bullet Points</option>
                      <option value="code">Code Block</option>
                      <option value="table">Table Format</option>
                      <option value="steps">Step-by-Step Guide</option>
                    </select>
                  </div>

                  {/* Generate Button */}
                  <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Generate Prompt
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.keys(fabricPrompts).map(category => (
                    <div key={category} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <div className="font-medium capitalize mb-1">{category}</div>
                      <div className="text-sm text-gray-600">
                        {fabricPrompts[category][0].label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      // ... [Other screens remain the same]
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>

      {/* Right Navigation Bar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          {/* Navigation Section */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK NAVIGATION</h2>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full p-2 rounded-lg transition-colors group
                  ${currentScreen === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${
                      currentScreen === item.id ? 'text-blue-500' : 'text-gray-500'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={currentScreen === item.id ? 'text-blue-500' : 'text-gray-500'}>
                    {item.description}
                  </span>
                  {item.count && (
                    <span className={`px-2 py-0.5 rounded-full text-xs
                      ${currentScreen === item.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'}`}>
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Template Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">PROMPT CATEGORIES</h2>
            <div className="space-y-2">
              {Object.entries(fabricPrompts).map(([category, prompts]) => (
                <div key={category} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                  <span className="text-sm capitalize">{category}</span>
                  <span className="text-xs font-medium text-blue-600">
                    {prompts.length} prompts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK STATS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(fabricPrompts).flat().length}
                </div>
                <div className="text-xs text-blue-600">Total Prompts</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-xs text-green-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWithNavigation;
