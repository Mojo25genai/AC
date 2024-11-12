import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ApprovalDashboard = () => {
  // Approval stages with detailed information
  const [approvalStages, setApprovalStages] = useState({
    legal_review: {
      title: 'Legal Review',
      status: 'pending',
      reviewer: 'Jane Smith',
      comments: '',
      lastUpdated: '2024-11-09',
      criteria: [
        'Compliance with regulatory requirements',
        'Data privacy considerations',
        'Terms of service alignment'
      ]
    },
    risk_compliance: {
      title: 'Risk & Compliance',
      status: 'in_review',
      reviewer: 'John Doe',
      comments: '',
      lastUpdated: '2024-11-09',
      criteria: [
        'Risk assessment completion',
        'Compliance with internal policies',
        'Control framework alignment'
      ]
    },
    mrm_review: {
      title: 'MRM Review',
      status: 'pending',
      reviewer: 'Alice Johnson',
      comments: '',
      lastUpdated: '2024-11-09',
      criteria: [
        'Model risk assessment',
        'Validation requirements',
        'Performance metrics'
      ]
    },
    cto_review: {
      title: 'CTO Review',
      status: 'pending',
      reviewer: 'Bob Wilson',
      comments: '',
      lastUpdated: '2024-11-09',
      criteria: [
        'Technical feasibility',
        'Architecture alignment',
        'Performance requirements'
      ]
    },
    cyber_review: {
      title: 'Cyber Security',
      status: 'pending',
      reviewer: 'Charlie Brown',
      comments: '',
      lastUpdated: '2024-11-09',
      criteria: [
        'Security assessment',
        'Vulnerability analysis',
        'Access control review'
      ]
    }
  });

  const [selectedStage, setSelectedStage] = useState(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const getStatusBadgeStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      in_review: '👀',
      approved: '✅',
      rejected: '❌'
    };
    return icons[status] || icons.pending;
  };

  const handleApprove = (stageId) => {
    setApprovalStages(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        status: 'approved',
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
    setShowReviewDialog(false);
  };

  const handleReject = (stageId) => {
    setApprovalStages(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        status: 'rejected',
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
    setShowReviewDialog(false);
  };

  const ReviewDialog = ({ stage, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Review: {stage.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Review Criteria</h3>
              <div className="space-y-2">
                {stage.criteria.map((criterion, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Comments</h3>
              <textarea
                className="w-full h-32 p-2 border rounded"
                placeholder="Enter your review comments..."
                value={stage.comments}
                onChange={(e) => {
                  setApprovalStages(prev => ({
                    ...prev,
                    [selectedStage]: {
                      ...prev[selectedStage],
                      comments: e.target.value
                    }
                  }));
                }}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleReject(selectedStage)}
              >
                Reject
              </Button>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleApprove(selectedStage)}
              >
                Approve
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Approval Dashboard</span>
            <span className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(approvalStages).map(([stageId, stage]) => (
              <div
                key={stageId}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedStage(stageId);
                  setShowReviewDialog(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium flex items-center gap-2">
                      {stage.title}
                      <span className={`px-2 py-1 rounded text-sm ${getStatusBadgeStyle(stage.status)}`}>
                        {getStatusIcon(stage.status)} {stage.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">Reviewer: {stage.reviewer}</p>
                    <p className="text-sm text-gray-500">Last Updated: {stage.lastUpdated}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStage(stageId);
                      setShowReviewDialog(true);
                    }}
                  >
                    Review
                  </Button>
                </div>
                {stage.comments && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                    <p className="font-medium">Comments:</p>
                    <p>{stage.comments}</p>
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Required Criteria:</p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {stage.criteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showReviewDialog && selectedStage && (
        <ReviewDialog
          stage={approvalStages[selectedStage]}
          onClose={() => setShowReviewDialog(false)}
        />
      )}
    </div>
  );
};

export default ApprovalDashboard;
