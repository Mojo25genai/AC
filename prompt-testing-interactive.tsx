import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Check
} from 'lucide-react';

const PromptTesting = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [history, setHistory] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const [metrics, setMetrics] = useState(null);
  
  const sampleResponses = [
    "Based on your prompt, here's a carefully crafted response that demonstrates natural language understanding and generation. The AI model has processed your input and generated this contextually relevant output.",
    "Let me help you with that request. I've analyzed your prompt and generated a response that aims to address your specific needs while maintaining clarity and coherence.",
    "Here's my interpretation of your prompt. I've considered various factors to generate a response that balances creativity with precision and relevance."
  ];

  const handleTest = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    setCurrentWord(0);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      animateResponse(randomResponse);
      
      const newMetrics = {
        tokens: Math.floor(Math.random() * 200) + 100,
        time: (Math.random() * 2 + 1).toFixed(1) + 's',
        cost: '$' + (Math.random() * 0.005).toFixed(4)
      };
      setMetrics(newMetrics);
      
      // Add to history
      const newTest = {
        id: Date.now(),
        timestamp: 'Just now',
        prompt: prompt,
        response: randomResponse,
        metrics: newMetrics
      };
      setHistory([newTest, ...history]);
    }, 1500);
  };

  const animateResponse = (fullResponse) => {
    const words = fullResponse.split(' ');
    setCurrentWord(0);
    
    const intervalId = setInterval(() => {
      setCurrentWord(prev => {
        if (prev >= words.length - 1) {
          clearInterval(intervalId);
          return words.length;
        }
        return prev + 1;
      });
    }, 50);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleSave = () => {
    // Simulate save animation
    const btn = document.getElementById('saveButton');
    btn.classList.add('bg-green-50');
    btn.classList.add('text-green-600');
    setTimeout(() => {
      btn.classList.remove('bg-green-50');
      btn.classList.remove('text-green-600');
    }, 1000);
  };

  useEffect(() => {
    if (response) {
      const words = response.split(' ');
      setResponse(words.slice(0, currentWord).join(' '));
    }
  }, [currentWord]);

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
            className="px-4 py-2 border rounded-md bg-white cursor-pointer hover:border-gray-400 transition-colors"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-2">Claude 2</option>
          </select>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
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
                className="w-full h-40 p-3 border rounded-md font-mono text-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setPrompt('')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Clear
                </button>
                <div className="space-x-3">
                  <button
                    id="saveButton"
                    onClick={handleSave}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleTest}
                    disabled={isLoading || !prompt.trim()}
                    className={`px-4 py-2 text-white rounded-md flex items-center gap-2 transition-colors
                      ${prompt.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
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
                    <p className="whitespace-pre-wrap">{response}</p>
                    {response && (
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <MetricsDisplay metrics={metrics} />
                        <button 
                          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors relative"
                          onClick={() => handleCopy(response)}
                        >
                          {showCopied ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy
                            </>
                          )}
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
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setShowHistory(!showHistory)}
            >
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
                  {history.map((test) => (
                    <div 
                      key={test.id} 
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        setPrompt(test.prompt);
                        setResponse(test.response);
                        setMetrics(test.metrics);
                      }}
                    >
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
