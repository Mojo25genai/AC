'use client'

import React, { useState } from 'react';
import { 
  CheckCircle2,
  Circle,
  LayoutDashboard,
  Binary,
  Library,
  Cog,
  Shield,
  TestTube
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Import the screen components we've already created
import WorkflowDashboard from '@/components/screens/WorkflowDashboard';
import WorkflowBuilder from '@/components/screens/WorkflowBuilder';
import PromptLibrary from '@/components/screens/PromptLibrary';
import PromptTesting from '@/components/screens/PromptTesting';

const ProgressNavLayout = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [completedSteps, setCompletedSteps] = useState(['dashboard']);

  // Updated steps with actual components
  const steps = [
    {
      id: 'dashboard',
      label: 'Workflow Dashboard',
      icon: LayoutDashboard,
      component: <WorkflowDashboard />
    },
    {
      id: 'builder',
      label: 'Workflow Builder',
      icon: Binary,
      component: <WorkflowBuilder />
    },
    {
      id: 'library',
      label: 'Prompt Library',
      icon: Library,
      component: <PromptLibrary />
    },
    {
      id: 'testing',
      label: 'Prompt Testing',
      icon: TestTube,
      component: <PromptTesting />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Cog,
      component: <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-2">General Settings</h3>
            <p className="text-gray-600">Configure your application preferences</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-2">API Configuration</h3>
            <p className="text-gray-600">Manage your API keys and endpoints</p>
          </div>
        </div>
      </div>
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      component: <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-2">Access Control</h3>
            <p className="text-gray-600">Manage permissions and access levels</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium mb-2">Security Logs</h3>
            <p className="text-gray-600">View security-related activities</p>
          </div>
        </div>
      </div>
    }
  ];

  const handleStepClick = (stepId: string) => {
    setCurrentScreen(stepId);
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getStepStatus = (stepId: string) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (currentScreen === stepId) return 'current';
    return 'pending';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Vertical Progress Navigation */}
      <div className="w-80 bg-white border-r p-6">
        <div className="flex items-center gap-2 mb-8">
          <Binary className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">PromptFlow</h1>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Steps */}
          <div className="relative space-y-6">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const StepIcon = step.icon;
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`
                    relative flex items-start w-full group
                    ${status === 'current' ? 'text-blue-600' : 'text-gray-600'}
                    hover:text-blue-600 transition-colors
                  `}
                >
                  {/* Step Icon */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                    transition-colors
                    ${status === 'completed' ? 'bg-blue-100' : 
                      status === 'current' ? 'bg-blue-500' : 'bg-gray-100'}
                  `}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    ) : status === 'current' ? (
                      <StepIcon className="w-6 h-6 text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="ml-4 mt-2">
                    <h3 className={`
                      font-medium text-sm mb-1
                      ${status === 'completed' ? 'text-gray-600' :
                        status === 'current' ? 'text-blue-600' : 'text-gray-600'}
                    `}>
                      {step.label}
                    </h3>
                    {status === 'completed' && (
                      <span className="text-xs text-green-600">Completed</span>
                    )}
                    {status === 'current' && (
                      <span className="text-xs text-blue-600">In Progress</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <Card className="h-full">
          <CardContent>
            {steps.find(step => step.id === currentScreen)?.component}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressNavLayout;
