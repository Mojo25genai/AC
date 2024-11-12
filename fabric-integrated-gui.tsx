import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Fabric integration types
const FABRIC_PATTERNS = {
  SUMMARIZE: {
    name: 'Summarize',
    description: 'Create a concise summary of the input',
    template: `You are a text analysis expert. Please provide a clear and concise summary of the following text while maintaining all key information and insights.

INPUT: {{input}}

Provide your response in the following format:
SUMMARY:
KEY POINTS:
- Point 1
- Point 2
MAIN INSIGHTS:
- Insight 1
- Insight 2`
  },
  EXTRACT: {
    name: 'Extract',
    description: 'Extract specific information from the input',
    template: `You are an information extraction expert. Please extract the following types of information from the input text:
- Names
- Dates
- Locations
- Key metrics

INPUT: {{input}}

FORMAT:
NAMES:
DATES:
LOCATIONS:
KEY METRICS:`
  },
  ANALYZE: {
    name: 'Analyze',
    description: 'Perform detailed analysis',
    template: `You are an analysis expert. Please analyze the following input for key patterns, trends, and insights:

INPUT: {{input}}

FORMAT:
ANALYSIS:
PATTERNS:
TRENDS:
INSIGHTS:
RECOMMENDATIONS:`
  }
};

const PatternEditor = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [patternConfig, setPatternConfig] = useState({
    name: '',
    description: '',
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 2000
  });

  // Fabric pattern configuration format
  const generateFabricConfig = () => {
    return {
      name: patternConfig.name,
      description: patternConfig.description,
      version: "1.0",
      type: "completion",
      input: {
        variables: {
          content: "string"
        }
      },
      prompt: {
        template: customPrompt,
        variables: ["content"]
      },
      model: {
        provider: "openai",
        name: patternConfig.model,
        parameters: {
          temperature: patternConfig.temperature,
          max_tokens: patternConfig.max_tokens
        }
      }
    };
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Pattern Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="template">
            <TabsList>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Pattern Template</label>
                <select 
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const pattern = FABRIC_PATTERNS[e.target.value];
                    setSelectedPattern(pattern);
                    setCustomPrompt(pattern?.template || '');
                  }}
                >
                  <option value="">Select a pattern...</option>
                  {Object.entries(FABRIC_PATTERNS).map(([key, pattern]) => (
                    <option key={key} value={key}>{pattern.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Prompt Template</label>
                <textarea
                  className="w-full h-64 p-4 border rounded font-mono text-sm"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your prompt template..."
                />
              </div>
            </TabsContent>

            <TabsContent value="config" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pattern Name</label>
                  <Input
                    value={patternConfig.name}
                    onChange={(e) => setPatternConfig(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., technical_summarizer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={patternConfig.model}
                    onChange={(e) => setPatternConfig(prev => ({...prev, model: e.target.value}))}
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-2">Claude 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Temperature</label>
                  <Input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={patternConfig.temperature}
                    onChange={(e) => setPatternConfig(prev => ({...prev, temperature: parseFloat(e.target.value)}))}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 (Precise)</span>
                    <span>{patternConfig.temperature}</span>
                    <span>2 (Creative)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Tokens</label>
                  <Input
                    type="number"
                    value={patternConfig.max_tokens}
                    onChange={(e) => setPatternConfig(prev => ({...prev, max_tokens: parseInt(e.target.value)}))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test Input</label>
                <textarea
                  className="w-full h-32 p-4 border rounded"
                  placeholder="Enter test input..."
                />
              </div>
              <Button className="w-full">
                Run Test
              </Button>
              <div>
                <label className="block text-sm font-medium mb-2">Output</label>
                <div className="w-full h-32 p-4 border rounded bg-gray-50">
                  Test output will appear here...
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">
              Export Pattern
            </Button>
            <Button
              onClick={() => {
                const config = generateFabricConfig();
                console.log('Fabric Pattern Config:', config);
                // Here you would save to fabric/patterns/{pattern-name}/config.json
              }}
            >
              Save Pattern
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Fabric Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(generateFabricConfig(), null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternEditor;
