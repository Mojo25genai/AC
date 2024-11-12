import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Save, 
  Copy, 
  Clock, 
  Settings, 
  MessageSquare, 
  Gauge,
  RotateCcw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const PromptTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  
  const testHistory = [
    {
      id: 1,
      timestamp: '2 mins ago',
      prompt: 'Generate a product description for a luxury watch',
      response: 'Introducing our masterpiece of horological excellence...',
      metrics: {
        tokens: 247,
        time: '2.3s',
        cost: '$0.004'
      }
    },
    {
      id: 2,
      timestamp: '15 mins ago',
      prompt: 'Write a professional email response to a customer complaint',
      response: 'Dear valued customer, Thank you for bringing this to our attention...',
      metrics: {
        tokens: 180,
        time: '1.8s',
        cost: '$0.003'
      }
    }
  ];

  const handleTest = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("This is a simulated response to your prompt. In a real implementation, this would be the AI model's response.");
      setIsLoading(false);
    }, 1500);
  };

  const MetricsDisplay = ({ metrics }) => (
    <div className="flex gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <MessageSquare className="w-4 h-4" /> {metrics.tokens} tokens
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" /> {metrics.time}
      </span>
      <span className="flex items-center gap-1">
        <Gauge className="w-4 h-4" /> {metrics.cost}
      </span>
    </div>
  );

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prompt Testing</h1>
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 border rounded-md bg-white"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-2">Claude 2</option>
          </select>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        <div className="w-2/3 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-40 p-3 border rounded-md font-mono text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setPrompt('')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Clear
                </button>
                <div className="space-x-3">
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleTest}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4" />
                    Test Prompt
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] p-3 bg-gray-50 rounded-md font-mono text-sm">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : response ? (
                  <div>
                    <p>{response}</p>
                    {response && (
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <MetricsDisplay 
                          metrics={{tokens: 150, time: '1.5s', cost: '$0.002'}} 
                        />
                        <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                          <Copy className="w-4 h-4" /> Copy
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    Response will appear here
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => setShowHistory(!showHistory)}>
              <CardTitle className="text-lg font-medium">Test History</CardTitle>
              {showHistory ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </CardHeader>
            {showHistory && (
              <CardContent>
                <div className="space-y-4">
                  {testHistory.map((test) => (
                    <div key={test.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium truncate flex-1">
                          {test.prompt}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {test.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {test.response}
                      </p>
                      <MetricsDisplay metrics={test.metrics} />
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptTesting;
