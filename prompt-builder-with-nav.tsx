import React, { useState } from 'react';
import { 
  ChevronDown, 
  ThumbsUp, 
  Shield, 
  Code, 
  MessageSquare,
  Copy,
  CheckCircle2,
  LayoutDashboard,
  Binary,
  Library,
  TestTube,
  Cog,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PromptBuilder = () => {
  // ... [Previous state declarations remain the same] ...

  const navigationItems = [
    { 
      id: 'dashboard',
      label: 'Workflow Dashboard',
      icon: LayoutDashboard,
      count: 5,
      description: 'View all workflows'
    },
    {
      id: 'builder',
      label: 'Workflow Builder',
      icon: Binary,
      count: 3,
      description: 'Create new workflows'
    },
    {
      id: 'library',
      label: 'Prompt Library',
      icon: Library,
      count: 12,
      description: 'Browse prompts'
    },
    {
      id: 'testing',
      label: 'Prompt Testing',
      icon: TestTube,
      count: 8,
      description: 'Test your prompts'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Cog,
      description: 'Configure preferences'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Prompt Builder</h1>
              <p className="text-gray-600">Build prompts using the "As a, I want to, So that" format</p>
            </div>
            <button 
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50"
            >
              <Code className="w-4 h-4" />
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* [Previous Card components remain the same] */}
          </div>

          {/* Generated Prompt Card remains the same */}
        </div>
      </div>

      {/* Right Navigation Bar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK NAVIGATION</h2>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {/* Handle navigation */}}
                className="w-full p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{item.description}</span>
                  {item.count && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
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
              <div className="p-2 rounded-lg bg-gray-50">
                <div className="text-sm font-medium">Product Analysis Workflow</div>
                <div className="text-xs text-gray-500">Modified 2 hours ago</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-50">
                <div className="text-sm font-medium">Customer Support Template</div>
                <div className="text-xs text-gray-500">Created 5 hours ago</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK STATS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-xs text-blue-600">Active Workflows</div>
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

export default PromptBuilder;
