import React, { useState } from 'react';
import { 
  ChevronDown, 
  ThumbsUp, 
  Shield, 
  Code, 
  MessageSquare,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PromptBuilder = () => {
  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const personas = [
    { value: 'retail-user', label: 'Retail User', count: 1234 },
    { value: 'scrum-master', label: 'Scrum Master', count: 856 },
    { value: 'architect', label: 'Architect', count: 654 },
    { value: 'developer', label: 'Developer', count: 1567 }
  ];

  const actions = [
    { value: 'minute', label: 'Create minutes', count: 789 },
    { value: 'user-story', label: 'Find user story', count: 567 },
    { value: 'summarize', label: 'Have a summary', count: 890 },
    { value: 'analyze', label: 'Analyze', count: 678 },
    { value: 'market-scan', label: 'Have a market scan', count: 456 }
  ];

  const outputs = [
    { value: 'podcast', label: 'Podcast Script', count: 234 },
    { value: 'video', label: 'Video Short', count: 567 },
    { value: 'presentation', label: 'Presentation', count: 789 },
    { value: 'table', label: 'Table Format', count: 456 },
    { value: 'analysis', label: 'XLS Analysis', count: 345 }
  ];

  const popularConfigs = [
    {
      persona: 'scrum-master',
      action: 'user-story',
      output: 'table',
      upvotes: 234,
      isApproved: true,
      description: 'User Story Generation Template'
    },
    {
      persona: 'architect',
      action: 'analyze',
      output: 'presentation',
      upvotes: 189,
      isApproved: true,
      description: 'Architecture Analysis Template'
    }
  ];

  const generatePrompt = () => {
    const persona = personas.find(p => p.value === selectedPersona)?.label;
    const action = actions.find(a => a.value === selectedAction)?.label;
    const output = outputs.find(o => o.value === outputFormat)?.label;
    
    return `As a ${persona}, I want to ${action?.toLowerCase()}, so that I can ${customGoal}. Please provide the output in ${output} format.`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Main Configuration Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Configure Your Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* As a... (Persona) */}
            <div>
              <label className="block text-sm font-medium mb-2">As a...</label>
              <div className="relative">
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Select your role</option>
                  {personas.map(persona => (
                    <option key={persona.value} value={persona.value}>
                      {persona.label} ({persona.count} uses)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* I want to... (Action) */}
            <div>
              <label className="block text-sm font-medium mb-2">I want to...</label>
              <div className="relative">
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Select an action</option>
                  {actions.map(action => (
                    <option key={action.value} value={action.value}>
                      {action.label} ({action.count} uses)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* So that I can... (Custom Goal) */}
            <div>
              <label className="block text-sm font-medium mb-2">So that I can...</label>
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Enter your goal"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <div className="relative">
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Select output format</option>
                  {outputs.map(output => (
                    <option key={output.value} value={output.value}>
                      {output.label} ({output.count} uses)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularConfigs.map((config, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPersona(config.persona);
                    setSelectedAction(config.action);
                    setOutputFormat(config.output);
                  }}
                  className="w-full p-3 rounded-lg border hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{config.description}</span>
                    {config.isApproved && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {config.upvotes}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Prompt */}
      {(selectedPersona && selectedAction && outputFormat) && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Generated Prompt</h3>
                <p className="text-gray-600">{generatePrompt()}</p>
              </div>
              <button
                onClick={() => handleCopy(generatePrompt())}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {showCode && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <pre className="text-sm">{JSON.stringify({
                  persona: selectedPersona,
                  action: selectedAction,
                  goal: customGoal,
                  output: outputFormat
                }, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptBuilder;
