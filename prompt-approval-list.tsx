import React, { useState } from 'react';
import { 
  Shield,
  Check,
  AlertCircle,
  Search,
  Filter,
  ThumbsUp,
  X,
  ArrowUpDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PromptApprovalList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes', 'recent', 'name'
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: 'Customer Service Response Generator',
      description: 'Generates professional responses for common customer inquiries',
      category: 'Customer Service',
      status: 'approved',
      upvotes: 256,
      author: 'Sarah Chen',
      dateSubmitted: '2024-02-15',
      approvedBy: 'Compliance Team',
      approvalDate: '2024-02-16'
    },
    {
      id: 2,
      title: 'Technical Documentation Writer',
      description: 'Creates structured technical documentation from code and comments',
      category: 'Development',
      status: 'pending',
      upvotes: 189,
      author: 'Mike Johnson',
      dateSubmitted: '2024-02-14'
    },
    {
      id: 3,
      title: 'Legal Clause Analyzer',
      description: 'Analyzes and explains legal clauses in simple terms',
      category: 'Legal',
      status: 'approved',
      upvotes: 342,
      author: 'Emily White',
      dateSubmitted: '2024-02-13',
      approvedBy: 'Legal Team',
      approvalDate: '2024-02-14'
    },
    {
      id: 4,
      title: 'Code Review Assistant',
      description: 'Provides detailed code review comments and suggestions',
      category: 'Development',
      status: 'rejected',
      upvotes: 145,
      author: 'Alex Wong',
      dateSubmitted: '2024-02-12',
      rejectedBy: 'Security Team',
      rejectionReason: 'Needs additional security considerations'
    }
  ]);

  const categories = ['Customer Service', 'Development', 'Legal', 'Marketing', 'Security'];

  const handleUpvote = (promptId) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === promptId 
        ? { ...prompt, upvotes: prompt.upvotes + 1 }
        : prompt
    ));
  };

  const handleStatusChange = (promptId, newStatus) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === promptId 
        ? { 
            ...prompt, 
            status: newStatus,
            ...(newStatus === 'approved' 
              ? { 
                  approvedBy: 'Compliance Team', 
                  approvalDate: new Date().toISOString().split('T')[0] 
                } 
              : {})
          }
        : prompt
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredPrompts = prompts
    .filter(prompt => 
      (selectedStatus === 'all' || prompt.status === selectedStatus) &&
      (selectedCategory === 'all' || prompt.category === selectedCategory) &&
      (prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       prompt.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'upvotes':
          return b.upvotes - a.upvotes;
        case 'recent':
          return new Date(b.dateSubmitted) - new Date(a.dateSubmitted);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Prompt Library</h1>
            <p className="text-gray-600">Manage and approve community prompts</p>
          </div>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="upvotes">Most Upvoted</option>
              <option value="recent">Most Recent</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-9 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Prompts List */}
        <div className="space-y-4">
          {filteredPrompts.map(prompt => (
            <Card key={prompt.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium">{prompt.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(prompt.status)}`}>
                        {getStatusIcon(prompt.status)}
                        {prompt.status.charAt(0).toUpperCase() + prompt.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{prompt.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>By {prompt.author}</span>
                      <span>Submitted {prompt.dateSubmitted}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                        {prompt.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <button 
                      onClick={() => handleUpvote(prompt.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{prompt.upvotes}</span>
                    </button>
                    {prompt.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(prompt.id, 'rejected')}
                          className="px-3 py-1 border rounded-md text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(prompt.id, 'approved')}
                          className="px-3 py-1 border rounded-md text-green-600 hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {(prompt.approvedBy || prompt.rejectedBy) && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-500">
                    {prompt.approvedBy && (
                      <span>Approved by {prompt.approvedBy} on {prompt.approvalDate}</span>
                    )}
                    {prompt.rejectedBy && (
                      <div>
                        <span>Rejected by {prompt.rejectedBy}</span>
                        {prompt.rejectionReason && (
                          <p className="text-red-600 mt-1">{prompt.rejectionReason}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">PROMPT STATS</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {prompts.filter(p => p.status === 'approved').length}
                </div>
                <div className="text-xs text-gray-600">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {prompts.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-xs text-gray-600">Pending</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-sm font-semibold text-gray-600 mb-4 mt-8">TOP CATEGORIES</h2>
          <div className="space-y-2">
            {categories.map(category => {
              const count = prompts.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-2 rounded-lg flex justify-between items-center
                    ${selectedCategory === category ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 hover:bg-gray-100'}
                  `}
                >
                  <span className="text-sm">{category}</span>
                  <span className="text-xs font-medium">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptApprovalList;
