import React, { useState } from 'react';
import { 
  Shield,
  ArrowRight,
  ChevronDown,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PromptLibraryBenchmark = () => {
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [isRunning, setIsRunning] = useState(false);

  // Define models
  const models = [
    { id: 'gpt-3.5', name: 'GPT-3.5', version: '3.5', imageUrl: '/gpt-3.png' },
    { id: 'gpt-4', name: 'GPT-4.0', version: '4.0', imageUrl: '/gpt-4.png' }
  ];

  // Define teams
  const teams = [
    { id: 'user', name: 'User Experience', count: 24 },
    { id: 'legal', name: 'Legal', count: 18 },
    { id: 'it-risk', name: 'IT Risk', count: 22 },
    { id: 'cyber', name: 'Cyber Security', count: 20 },
    { id: 'compliance', name: 'Compliance', count: 16 },
    { id: 'mrm', name: 'Model Risk', count: 19 },
    { id: 'cto', name: 'CTO Office', count: 15 }
  ];

  // Define navigation items
  const navigationItems = [
    { 
      id: 'dashboard',
      label: 'Workflow Dashboard',
      icon: Shield,
      count: 5,
      description: 'View all workflows'
    },
    {
      id: 'builder',
      label: 'Workflow Builder',
      icon: ArrowRight,
      count: 3,
      description: 'Create new workflows'
    },
    {
      id: 'library',
      label: 'Prompt Library',
      icon: Shield,
      count: 12,
      description: 'Browse prompts'
    },
    {
      id: 'testing',
      label: 'Prompt Testing',
      icon: Check,
      count: 8,
      description: 'Test your prompts'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: AlertCircle,
      description: 'Configure preferences'
    }
  ];

  // Benchmark data with detailed metrics
  const benchmarkData = {
    'gpt-3.5': {
      accuracy: 90.0,
      latency: 0.80,
      cost: 0.027,
      promptsTested: 450,
      successfulRuns: 405,
      approved: 24,
      pending: 8,
      totalRuns: 1250,
      averageTokens: 850,
      averageResponseLength: 245,
      errorRate: 2.3
    },
    'gpt-4': {
      accuracy: 96.0,
      latency: 1.12,
      cost: 0.037,
      promptsTested: 450,
      successfulRuns: 432,
      approved: 18,
      pending: 12,
      totalRuns: 1250,
      averageTokens: 920,
      averageResponseLength: 312,
      errorRate: 1.1
    }
  };

  const getMetricIcon = (type) => {
    switch(type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  // ... [Rest of your component implementation remains the same] ...

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Prompt Library Benchmark Results</h1>
            <p className="text-gray-600">
              Performance analysis of {benchmarkData['gpt-3.5'].promptsTested} approved prompts 
              across {benchmarkData['gpt-3.5'].totalRuns.toLocaleString()} test runs
            </p>
          </div>

          {/* Model Cards */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            {models.map(model => {
              const data = benchmarkData[model.id];
              return (
                <Card key={model.id}>
                  <CardContent className="p-6">
                    {/* Model Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-semibold">{model.name}</h2>
                        <p className="text-sm text-gray-500">
                          Based on {data.totalRuns.toLocaleString()} prompt library executions
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium">
                          {data.successfulRuns} / {data.promptsTested} successful
                        </span>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-8">
                      {/* Accuracy Metric */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          {getMetricIcon('success')}
                          <div className="text-sm font-medium text-gray-600">Prompt Accuracy</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{data.accuracy}%</div>
                          <div className="text-sm text-gray-500">of prompts meet quality standards</div>
                        </div>
                      </div>

                      {/* Latency Metric */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          {getMetricIcon(data.latency <= 0.9 ? 'success' : 'warning')}
                          <div className="text-sm font-medium text-gray-600">Response Time</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{data.latency}s</div>
                          <div className="text-sm text-gray-500">average response time</div>
                        </div>
                      </div>

                      {/* Cost Metric */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          {getMetricIcon(data.cost <= 0.03 ? 'success' : 'warning')}
                          <div className="text-sm font-medium text-gray-600">Execution Cost</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">${data.cost}</div>
                          <div className="text-sm text-gray-500">average cost per run</div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-700">Additional Metrics</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Average Tokens:</span>
                          <span className="ml-2 font-medium">{data.averageTokens}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Response Length:</span>
                          <span className="ml-2 font-medium">{data.averageResponseLength}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Error Rate:</span>
                          <span className="ml-2 font-medium">{data.errorRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Success Rate:</span>
                          <span className="ml-2 font-medium">
                            {((data.successfulRuns / data.promptsTested) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
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
                onClick={() => console.log(`Navigate to ${item.id}`)}
                className="w-full p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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

          {/* Stats Section */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">APPROVAL STATUS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">450</div>
                    <div className="text-xs text-green-600">Approved</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">85</div>
                    <div className="text-xs text-yellow-600">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">TEAM STATS</h2>
            <div className="space-y-2">
              {teams.map(team => (
                <div key={team.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{team.name}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {team.count}/24
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLibraryBenchmark;
