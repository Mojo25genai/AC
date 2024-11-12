import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Binary,  // Replacing FlowArrow
  Library, 
  Flask,   // Replacing Beaker
  Settings, 
  Shield, 
  Users,
  ChevronDown,
  Bell,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';

const Navigation = ({ currentScreen, setCurrentScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutGrid,
      screen: 'WorkflowDashboard' 
    },
    { 
      id: 'workflow-builder', 
      label: 'Workflow Builder', 
      icon: Binary,  // Changed from FlowArrow
      screen: 'WorkflowBuilder'
    },
    { 
      id: 'prompt-library', 
      label: 'Prompt Library', 
      icon: Library,
      screen: 'PromptLibrary'
    },
    { 
      id: 'prompt-testing', 
      label: 'Prompt Testing', 
      icon: Flask,  // Changed from Beaker
      screen: 'PromptTesting'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      screen: 'Settings'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: Shield,
      screen: 'Security'
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-64 bg-gray-900 text-white p-4
      `}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Binary className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">PromptFlow</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentScreen(item.screen);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-md
                transition-colors duration-200
                ${currentScreen === item.screen
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  SC
                </div>
                <span>Sarah Chen</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Render the current screen here */}
          {currentScreen === 'WorkflowDashboard' && <WorkflowDashboard />}
          {currentScreen === 'WorkflowBuilder' && <WorkflowBuilder />}
          {currentScreen === 'PromptLibrary' && <PromptLibrary />}
          {currentScreen === 'PromptTesting' && <PromptTesting />}
          {/* Add other screens as needed */}
        </main>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('WorkflowDashboard');

  return (
    <Navigation 
      currentScreen={currentScreen}
      setCurrentScreen={setCurrentScreen}
    />
  );
};

export default App;
