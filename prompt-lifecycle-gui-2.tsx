import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data for approvals and lifecycle stages
const APPROVAL_STAGES = {
  DRAFT: 'draft',
  LEGAL_REVIEW: 'legal_review',
  RISK_COMPLIANCE: 'risk_compliance',
  MRM_REVIEW: 'mrm_review',
  CTO_REVIEW: 'cto_review',
  CYBER_REVIEW: 'cyber_review',
  PUBLISHED: 'published'
};

const PromptLifecycleGUI = () => {
  const [currentView, setCurrentView] = useState('editor'); // editor, approvals, discover
  const [currentStage, setCurrentStage] = useState(APPROVAL_STAGES.DRAFT);
  const [prompt, setPrompt] = useState('');
  const [approvalComments, setApprovalComments] = useState({});
  const [upvotes, setUpvotes] = useState(0);

  // Mock approval status
  const [approvalStatus] = useState({
    [APPROVAL_STAGES.LEGAL_REVIEW]: { approved: false, reviewer: 'Jane Smith' },
    [APPROVAL_STAGES.RISK_COMPLIANCE]: { approved: false, reviewer: 'John Doe' },
    [APPROVAL_STAGES.MRM_REVIEW]: { approved: false, reviewer: 'Alice Johnson' },
    [APPROVAL_STAGES.CTO_REVIEW]: { approved: false, reviewer: 'Bob Wilson' },
    [APPROVAL_STAGES.CYBER_REVIEW]: { approved: false, reviewer: 'Charlie Brown' }
  });

  const Navigation = () => (
    <div className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold">Prompt Lifecycle Manager</span>
          <nav className="flex space-x-4">
            <Button 
              variant={currentView === 'editor' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('editor')}
            >
              📝 Editor
            </Button>
            <Button 
              variant={currentView === 'approvals' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('approvals')}
            >
              ✅ Approvals
            </Button>
            <Button 
              variant={currentView === 'discover' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('discover')}
            >
              🔍 Discover
            </Button>
          </nav>
        </div>
        <div>
          <Button variant="outline">👤 Profile</Button>
        </div>
      </div>
    </div>
  );

  const LifecycleProgress = () => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Prompt Lifecycle Stage</h3>
          <span className="text-sm text-gray-500">Stage {Object.keys(APPROVAL_STAGES).indexOf(currentStage) + 1}/7</span>
        </div>
        <div className="relative">
          <div className="flex justify-between mb-2">
            {Object.keys(APPROVAL_STAGES).map((stage, index) => (
              <div 
                key={stage}
                className={`flex flex-col items-center relative z-10 ${
                  Object.keys(APPROVAL_STAGES).indexOf(currentStage) >= index 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  Object.keys(APPROVAL_STAGES).indexOf(currentStage) >= index 
                    ? 'bg-blue-100' 
                    : 'bg-gray-100'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-1">{stage.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-600 transition-all"
              style={{ 
                width: `${(Object.keys(APPROVAL_STAGES).indexOf(currentStage) / 
                  (Object.keys(APPROVAL_STAGES).length - 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ApprovalDashboard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Approval Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(approvalStatus).map(([stage, status]) => (
            <div key={stage} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{stage.replace('_', ' ')}</h3>
                  <p className="text-sm text-gray-500">Reviewer: {status.reviewer}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    status.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status.approved ? '✅ Approved' : '⏳ Pending'}
                  </span>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </div>
              {approvalComments[stage] && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Comments: {approvalComments[stage]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const DiscoverView = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Discover Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input 
              placeholder="Search prompts..." 
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline">
                Filter 🔍
              </Button>
              <Button variant="outline">
                Sort ⬇️
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {/* Mock prompt cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Example Prompt {i}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created by: User {i}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Category {i}
                        </span>
                        <span className="text-sm text-gray-500">
                          {upvotes + i} upvotes
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Use Prompt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <LifecycleProgress />
        
        {currentView === 'editor' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-64 p-4 border rounded-lg"
                    placeholder="Enter your prompt here..."
                  />
                  <div className="flex justify-between mt-4">
                    <Button variant="outline">
                      Save Draft
                    </Button>
                    <Button 
                      onClick={() => setCurrentView('approvals')}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Submit for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select className="w-full p-2 border rounded">
                        <option>General</option>
                        <option>Technical</option>
                        <option>Creative</option>
                        <option>Business</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tags</label>
                      <Input placeholder="Add tags..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Version</label>
                      <Input defaultValue="1.0.0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {currentView === 'approvals' && <ApprovalDashboard />}
        
        {currentView === 'discover' && <DiscoverView />}
      </main>
    </div>
  );
};

export default PromptLifecycleGUI;
