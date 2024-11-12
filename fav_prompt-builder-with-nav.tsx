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

  const handleNavigation = (screenId: string) => {
    // Handle navigation here
    console.log(`Navigating to: ${screenId}`);
  };

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
      </div>

      {/* Right Navigation Bar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK NAVIGATION</h2>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
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
