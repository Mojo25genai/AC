import React, { useState } from 'react';
import { 
  Shield, 
  Gauge,
  ChevronRight,
  LayoutDashboard,
  Binary,
  Library,
  TestTube,
  Cog,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BenchmarkTesting = () => {
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [isRunning, setIsRunning] = useState(false);

  const models = [
    { id: 'gpt-3.5', name: 'GPT-3.5', version: '3.5' },
    { id: 'gpt-4', name: 'GPT-4.0', version: '4.0' }
  ];

  const teams = [
    { id: 'user', name: 'User Experience', color: 'blue' },
    { id: 'legal', name: 'Legal', color: 'purple' },
    { id: 'it-risk', name: 'IT Risk', color: 'yellow' },
    { id: 'cyber', name: 'Cyber Security', color: 'red' },
    { id: 'compliance', name: 'Compliance', color: 'green' },
    { id: 'mrm', name: 'Model Risk', color: 'orange' },
    { id: 'cto', name: 'CTO Office', color: 'indigo' }
  ];

  const benchmarkPrompts = [
    {
      id: 1,
      name: 'Customer Data Handling',
      category: 'Security',
      status: 'approved',
      results: {
        'gpt-3.5': { accuracy: 92, latency: 0.8, cost: 0.03 },
        'gpt-4': { accuracy: 97, latency: 1.2, cost: 0.06 }
      },
      approvals: {
        user: 'approved',
        legal: 'approved',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'approved',
        mrm: 'approved',
        cto: 'approved'
      }
    },
    {
      id: 2,
      name: 'Code Review Standards',
      category: 'Development',
      status: 'partial',
      results: {
        'gpt-3.5': { accuracy: 88, latency: 0.7, cost: 0.02 },
        'gpt-4': { accuracy: 95, latency: 1.1, cost: 0.05 }
      },
      approvals: {
        user: 'approved',
        legal: 'approved',
        'it-risk': 'pending',
        cyber: 'approved',
        compliance: 'approved',
        mrm: 'pending',
        cto: 'approved'
      }
    },
    {
      id: 3,
      name: 'Market Analysis Template',
      category: 'Analytics',
      status: 'pending',
      results: {
        'gpt-3.5': { accuracy: 90, latency: 0.9, cost: 0.03 },
        'gpt-4': { accuracy: 96, latency: 1.3, cost: 0.07 }
      },
      approvals: {
        user: 'approved',
        legal: 'pending',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'pending',
        mrm: 'approved',
        cto: 'approved'
      }
    }
  ];

  const getApprovalStatus = (approvals) => {
    const statuses = Object.values(approvals);
    if (statuses.every(status => status === 'approved')) return 'approved';
    if (statuses.some(status => status === 'rejected')) return 'rejected';
    return 'partial';
  };

  const getStatusColor = (metric: number) => {
    if (metric >= 95) return 'text-green-600';
    if (metric >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Prompt Benchmark Testing</h1>
              <p className="text-gray-600">Compare prompt performance across GPT models</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsRunning(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                disabled={isRunning}
              >
                {isRunning ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Running Tests...' : 'Run Benchmark'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select 
              className="px-4 py-2 border rounded-md"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="all">All Models</option>
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name} v{model.version}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border rounded-md"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>

          {/* Benchmark Results */}
          <div className="space-y-4">
            {benchmarkPrompts.map(prompt => (
              <Card key={prompt.id}>
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">{prompt.name}</h3>
                        {getApprovalStatus(prompt.approvals) === 'approved' && (
                          <Shield className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{prompt.category}</span>
                    </div>
                    <div className="flex gap-2">
                      {models.map(model => (
                        <span key={model.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {model.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Model Performance Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {models.map(model => {
                      const result = prompt.results[model.id];
                      return (
                        <div key={model.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className={`text-xl font-bold ${getStatusColor(result.accuracy)}`}>
                                {result.accuracy}%
                              </div>
                              <div className="text-sm text-gray-500">Accuracy</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-700">{result.latency}s</div>
                              <div className="text-sm text-gray-500">Latency</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-700">${result.cost}</div>
                              <div className="text-sm text-gray-500">Cost</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Team Approvals */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-7 gap-2">
                      {teams.map(team => (
                        <div key={team.id} className="flex flex-col items-center">
                          <span className="text-xs text-gray-500 mb-1">{team.name}</span>
                          {prompt.approvals[team.id] === 'approved' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : prompt.approvals[team.id] === 'pending' ? (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Navigation Bar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">MODEL PERFORMANCE</h2>
          
          {/* Model Performance Summary */}
          <div className="space-y-4 mb-8">
            {models.map(model => (
              <Card key={model.id}>
                <CardContent className="p-4">
                  <div className="text-lg font-semibold mb-2">{model.name}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Accuracy</span>
                      <span className="font-medium text-green-600">94.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Latency</span>
                      <span className="font-medium">0.9s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Cost</span>
                      <span className="font-medium">$0.04</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Approval Summary */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">APPROVAL STATUS</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-xs text-green-600">Fully Approved</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-xs text-yellow-600">Pending</div>
            </div>
          </div>

          {/* Team Statistics */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">TEAM APPROVAL RATE</h2>
          <div className="space-y-3">
            {teams.map(team => (
              <div key={team.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                <span className="text-sm">{team.name}</span>
                <span className="text-sm font-medium text-green-600">18/24</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkTesting;
