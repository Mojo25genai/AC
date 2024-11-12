'use client'

import React, { useState } from 'react';
import { 
  CheckCircle2,
  Circle,
  LayoutDashboard,
  Binary,
  Library,
  Beaker,  // Replacing Flask with Beaker
  Settings,
  Shield 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProgressNavLayout = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [completedSteps, setCompletedSteps] = useState(['dashboard']);

  const steps = [
    {
      id: 'dashboard',
      label: 'Workflow Dashboard',
      icon: LayoutDashboard,
      component: <div>Dashboard Content</div>
    },
    {
      id: 'builder',
      label: 'Workflow Builder',
      icon: Binary,
      component: <div>Workflow Builder Content</div>
    },
    {
      id: 'library',
      label: 'Prompt Library',
      icon: Library,
      component: <div>Prompt Library Content</div>
    },
    {
      id: 'testing',
      label: 'Prompt Testing',
      icon: Beaker,  // Changed from Flask to Beaker
      component: <div>Prompt Testing Content</div>
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      component: <div>Settings Content</div>
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      component: <div>Security Content</div>
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
