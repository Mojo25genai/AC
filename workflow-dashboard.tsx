import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Pause,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Activity,
  Star,
  StarOff,
  FolderOpen,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  PauseCircle
} from 'lucide-react';

const WorkflowDashboard = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Customer Support Assistant',
      description: 'Automated response generation for common support tickets',
      status: 'active',
      favorite: true,
      lastRun: '2 mins ago',
      successRate: 98.5,
      avgResponseTime: '1.2s',
      runCount: 15234,
      author: 'Sarah Chen',
      category: 'Support'
    },
    {
      id: 2,
      name: 'Product Description Generator',
      description: 'Creates SEO-optimized product descriptions from basic specifications',
      status: 'paused',
      favorite: false,
      lastRun: '1 hour ago',
      successRate: 99.1,
      avgResponseTime: '2.1s',
      runCount: 8456,
      author: 'Mike Johnson',
      category: 'Marketing'
    },
    {
      id: 3,
      name: 'Code Review Assistant',
      description: 'Analyzes pull requests and provides detailed code reviews',
      status: 'error',
      favorite: true,
      lastRun: '5 mins ago',
      successRate: 92.3,
      avgResponseTime: '3.5s',
      runCount: 4567,
      author: 'Alex Wong',
      category: 'Development'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdownId, setShowDropdownId] = useState(null);

  const categories = ['All', 'Support', 'Marketing', 'Development', 'Sales', 'HR'];

  const toggleFavorite = (id) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, favorite: !workflow.favorite }
        : workflow
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <PauseCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const toggleStatus = (id) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        const newStatus = workflow.status === 'active' ? 'paused' : 'active';
        return { ...workflow, status: newStatus };
      }
      return workflow;
    }));
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workflows</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search workflows..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors
                ${selectedCategory === category 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {workflows.map(workflow => (
          <Card 
            key={workflow.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <button 
                    onClick={() => toggleFavorite(workflow.id)}
                    className="mt-1"
                  >
                    {workflow.favorite ? (
                      <Star className="w-5 h-5 text-yellow-400 hover:text-yellow-500" fill="currentColor" />
                    ) : (
                      <StarOff className="w-5 h-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold">{workflow.name}</h2>
                      {getStatusIcon(workflow.status)}
                    </div>
                    <p className="text-gray-600 mb-4">{workflow.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last run: {workflow.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Success rate: {workflow.successRate}%
                      </span>
                      <span>Runs: {workflow.runCount.toLocaleString()}</span>
                      <span>Response time: {workflow.avgResponseTime}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                        {workflow.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(workflow.id)}
                      className={`p-2 rounded-md hover:bg-gray-100 transition-colors`}
                    >
                      {workflow.status === 'active' ? (
                        <Pause className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Play className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdownId(showDropdownId === workflow.id ? null : workflow.id)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      {showDropdownId === workflow.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <FolderOpen className="w-4 h-4" /> Open
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Copy className="w-4 h-4" /> Duplicate
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowDashboard;
