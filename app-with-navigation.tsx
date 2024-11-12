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

  // Shared data for all screens
  const recentActivity = [
    {
      title: "Product Analysis Workflow",
      timestamp: "Modified 2 hours ago"
    },
    {
      title: "Customer Support Template",
      timestamp: "Created 5 hours ago"
    }
  ];

  // Function to handle copying
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simplified demo content for each screen
  const renderScreen = () => {
    switch(currentScreen) {
      case 'prompt-builder':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Prompt Builder</h1>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">As a...</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Select role</option>
                      <option>Developer</option>
                      <option>Product Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">I want to...</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Select action</option>
                      <option>Create documentation</option>
                      <option>Review code</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">So that...</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your goal"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'prompt-testing':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Prompt Testing</h1>
            <Card className="mb-6">
              <CardContent className="p-6">
                <textarea
                  className="w-full h-32 p-3 border rounded-md mb-4"
                  placeholder="Enter your prompt here..."
                />
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Test Prompt
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'benchmark':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Benchmark Results</h1>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>GPT-3.5</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Accuracy</span>
                      <span className="text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency</span>
                      <span>0.8s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost</span>
                      <span>$0.02</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>GPT-4</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Accuracy</span>
                      <span className="text-green-600">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency</span>
                      <span>1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost</span>
                      <span>$0.04</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
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

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">RECENT ACTIVITY</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-2 rounded-lg bg-gray-50">
                  <div className="text-sm font-medium">{activity.title}</div>
                  <div className="text-xs text-gray-500">{activity.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK STATS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-xs text-blue-600">Active Prompts</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-xs text-green-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWithNavigation;
