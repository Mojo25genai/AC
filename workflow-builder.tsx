import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Save, Play, Settings, ArrowRight } from 'lucide-react';

const WorkflowBuilder = () => {
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      type: 'prompt',
      name: `Step ${steps.length + 1}`,
      content: '',
      settings: {
        temperature: 0.7,
        maxTokens: 150,
        model: 'gpt-3.5-turbo'
      }
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id, updates) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, ...updates } : step
    ));
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workflow Builder</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Workflow
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run Workflow
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        <div className="w-2/3 bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <Card 
                key={step.id}
                className={`${selectedStep === step.id ? 'border-blue-500' : ''}`}
                onClick={() => setSelectedStep(step.id)}
              >
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <CardTitle className="text-lg font-medium">
                    {step.name}
                  </CardTitle>
                  <Settings 
                    className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Open settings modal
                    }}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <textarea
                    className="w-full h-24 p-2 border rounded-md"
                    value={step.content}
                    onChange={(e) => updateStep(step.id, { content: e.target.value })}
                    placeholder="Enter prompt or configuration..."
                  />
                </CardContent>
              </Card>
            ))}

            <button
              onClick={addStep}
              className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Step
            </button>
          </div>
        </div>

        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Step Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStep ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Step Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={steps.find(s => s.id === selectedStep)?.name || ''}
                      onChange={(e) => updateStep(selectedStep, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Temperature
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      className="w-full"
                      value={steps.find(s => s.id === selectedStep)?.settings.temperature || 0.7}
                      onChange={(e) => updateStep(selectedStep, {
                        settings: {
                          ...steps.find(s => s.id === selectedStep)?.settings,
                          temperature: parseFloat(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Select a step to configure
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
