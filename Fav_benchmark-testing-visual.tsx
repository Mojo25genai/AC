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
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Play,
  TrendingUp,
  TrendingDown,
  DollarSign
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
        'gpt-4': { accuracy: 97, latency: 1.12, cost: 0.042 }
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
        'gpt-4': { accuracy: 95, latency: 0.98, cost: 0.028 }
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
        'gpt-4': { accuracy: 96, latency: 1.26, cost: 0.042 }
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

  const MetricComparison = ({ baseValue, compareValue, label, format = 'number', inverse = false }) => {
    const percentDiff = ((compareValue - baseValue) / baseValue) * 100;
    const isPositive = inverse ? percentDiff < 0 : percentDiff > 0;
    
    const formatValue = (value) => {
      switch(format) {
        case 'currency':
          return `$${value.toFixed(3)}`;
        case 'time':
          return `${value.toFixed(2)}s`;
        default:
          return `${value.toFixed(1)}%`;
      }
    };

    return (
      <div className="text-center">
        <div className="flex flex-col items-center">
          <div className={`text-xl font-bold ${
            label === 'Accuracy' ? getStatusColor(compareValue) : 'text-gray-700'
          }`}>
            {formatValue(compareValue)}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(percentDiff).toFixed(1)}%
              {isPositive ? 
                <TrendingUp className="w-3 h-3 inline ml-1" /> : 
                <TrendingDown className="w-3 h-3 inline ml-1" />
              }
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
      </div>
    );
  };

  const ModelComparisonCard = ({ model, results }) => {
    const baseResults = results['gpt-3.5'];
    const compareResults = results[model.id];

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-700">{model.name}</span>
          <span className="text-xs text-gray-500">v{model.version}</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <MetricComparison 
            baseValue={baseResults.accuracy}
            compareValue={compareResults.accuracy}
            label="Accuracy"
          />
          <MetricComparison 
            baseValue={baseResults.latency}
            compareValue={compareResults.latency}
            label="Latency"
            format="time"
            inverse={true}
          />
          <MetricComparison 
            baseValue={baseResults.cost}
            compareValue={compareResults.cost}
            label="Cost"
            format="currency"
            inverse={true}
          />
        </div>
      </div>
    );
  };

  const getStatusColor = (metric: number) => {
    if (metric >= 95) return 'text-green-600';
    if (metric >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Model Benchmark Comparison</h1>
              <p className="text-gray-600">Compare performance metrics across models</p>
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

          {/* Benchmark Results */}
          <div className="space-y-4">
            {benchmarkPrompts.map(prompt => (
              <Card key={prompt.id}>
                <CardContent className="p-6">
                  {/* Prompt Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">{prompt.name}</h3>
                        {prompt.status === 'approved' && (
                          <Shield className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{prompt.category}</span>
                    </div>
                  </div>

                  {/* Model Comparisons */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {models.map(model => (
                      <ModelComparisonCard 
                        key={model.id}
                        model={model}
                        results={prompt.results}
                      />
                    ))}
                  </div>

                  {/* Performance Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">Performance Summary</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">Accuracy Gain</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-500">
                            +{(prompt.results['gpt-4'].accuracy - prompt.results['gpt-3.5'].accuracy).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">Latency Impact</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium text-yellow-500">
                            +{((prompt.results['gpt-4'].latency - prompt.results['gpt-3.5'].latency) * 1000).toFixed(0)}ms
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">Cost Difference</span>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-blue-500">
                            +${(prompt.results['gpt-4'].cost - prompt.results['gpt-3.5'].cost).toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkTesting;
