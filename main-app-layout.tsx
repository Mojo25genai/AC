import React, { useState } from 'react';
import { 
  Shield,
  ArrowRight,
  Check,
  AlertCircle,
  X
} from 'lucide-react';

// Import all screen components (these would normally be in separate files)
import PromptBuilder from './PromptBuilder';
import PromptTesting from './PromptTesting';
import PromptLibraryBenchmark from './PromptLibraryBenchmark';
import JobFamilySkillBuilder from './JobFamilySkillBuilder';

const MainLayout = () => {
  const [currentScreen, setCurrentScreen] = useState('prompt-builder');

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
    },
    {
      id: 'skill-builder',
      label: 'Skill Builder',
      icon: ArrowRight,
      count: 3,
      description: 'Create learning paths'
    }
  ];

  const renderScreen = () => {
    switch(currentScreen) {
      case 'prompt-builder':
        return <PromptBuilder />;
      case 'prompt-testing':
        return <PromptTesting />;
      case 'benchmark':
        return <PromptLibraryBenchmark />;
      case 'skill-builder':
        return <JobFamilySkillBuilder />;
      default:
        return <PromptBuilder />;
    }
  };

  // Shared activity data
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
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

export default MainLayout;
