import React, { useState } from 'react';
import { 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  LayoutDashboard,
  Binary,
  Library,
  TestTube,
  Cog,
  Users,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ApprovalManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const approvalTeams = [
    { id: 'legal', name: 'Legal', color: 'blue' },
    { id: 'it-risk', name: 'IT Risk', color: 'yellow' },
    { id: 'cyber', name: 'Cyber Security', color: 'red' },
    { id: 'compliance', name: 'Compliance', color: 'purple' }
  ];

  const prompts = [
    {
      id: 1,
      name: 'Customer Support Response Generator',
      description: 'Generates contextual customer support responses',
      status: 'approved',
      approvals: {
        legal: 'approved',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'approved'
      },
      usage: 1234,
      lastUpdated: '2 hours ago',
      category: 'Customer Service'
    },
    {
      id: 2,
      name: 'Code Review Assistant',
      description: 'AI-powered code review and suggestions',
      status: 'pending',
      approvals: {
        legal: 'approved',
        'it-risk': 'pending',
        cyber: 'pending',
        compliance: 'approved'
      },
      usage: 856,
      lastUpdated: '5 hours ago',
      category: 'Development'
    },
    {
      id: 3,
      name: 'Market Analysis Report',
      description: 'Generates market analysis reports from data',
      status: 'review',
      approvals: {
        legal: 'rejected',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'pending'
      },
      usage: 567,
      lastUpdated: '1 day ago',
      category: 'Analytics'
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Prompt Approval Management</h1>
              <p className="text-gray-600">Manage and track approval status across teams</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-green-50 border-green-100">
                <CardContent className="py-4 px-6">
                  <div className="text-2xl font-bold text-green-600">76%</div>
                  <div className="text-sm text-green-600">Approval Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="py-4 px-6">
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-blue-600">Approved Prompts</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="w-full pl-9 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-2 border rounded-md"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="all">All Teams</option>
              {approvalTeams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>

          {/* Prompts List */}
          <div className="space-y-4">
            {prompts.map(prompt => (
              <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{prompt.name}</h3>
                      <p className="text-gray-600">{prompt.description}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                      {prompt.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {approvalTeams.map(team => (
                      <div 
                        key={team.id}
                        className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">{team.name}</span>
                        {getStatusIcon(prompt.approvals[team.id])}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Usage: {prompt.usage.toLocaleString()}</span>
                      <span>Updated {prompt.lastUpdated}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                onClick={() => console.log(`Navigate to ${item.id}`)}
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

          {/* Approval Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">APPROVAL STATS</h2>
            <div className="space-y-3">
              {approvalTeams.map(team => (
                <div key={team.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{team.name}</span>
                    <span className="text-sm text-gray-500">24 approved</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${team.color}-500 h-2 rounded-full`}
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">QUICK STATS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">85</div>
                <div className="text-xs text-blue-600">Total Prompts</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-xs text-green-600">Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalManagement;
