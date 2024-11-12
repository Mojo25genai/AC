import React, { useState } from 'react';
import { 
  Shield,
  ArrowRight,
  Check,
  AlertCircle,
  Send,
  Clock,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you with your post-advisory questions?",
      sender: 'ai',
      status: 'verified',
      timestamp: '10:00 AM',
      verifiedBy: 'Compliance Team'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentView, setCurrentView] = useState('user'); // 'user' or 'verifier'
  
  // Queue for messages awaiting verification
  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 2,
      text: "Based on our previous discussion about your investment strategy, I recommend focusing on diversification across different asset classes. However, please note this is general guidance and not specific financial advice.",
      sender: 'ai',
      status: 'pending',
      timestamp: '10:05 AM',
      originalQuestion: "Can you help me understand more about diversification?"
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      status: 'sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response needing verification
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `AI response to: "${newMessage}" (Awaiting verification)`,
        sender: 'ai',
        status: 'pending',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        originalQuestion: newMessage
      };

      setVerificationQueue(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  const handleVerification = (messageId, action) => {
    const message = verificationQueue.find(m => m.id === messageId);
    if (!message) return;

    if (action === 'approve') {
      const approvedMessage = {
        ...message,
        status: 'verified',
        verifiedBy: 'Compliance Team',
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, approvedMessage]);
      setVerificationQueue(prev => prev.filter(m => m.id !== messageId));
    } else if (action === 'reject') {
      setVerificationQueue(prev => prev.filter(m => m.id !== messageId));
    }
  };

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${
        message.sender === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
        } rounded-lg p-3`}
      >
        <p className="mb-1">{message.text}</p>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="opacity-75">{message.timestamp}</span>
          {message.status === 'verified' && (
            <div className="flex items-center gap-1 text-green-500">
              <Check className="w-4 h-4" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const VerificationItem = ({ message }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Awaiting Verification</span>
          </div>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">Original Question:</div>
          <p className="text-gray-700 mb-4">{message.originalQuestion}</p>
          <div className="text-sm text-gray-500 mb-2">AI Response:</div>
          <p className="text-gray-700">{message.text}</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleVerification(message.id, 'reject')}
            className="px-4 py-2 border rounded-md text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => handleVerification(message.id, 'approve')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Approve
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Compliance-Verified Chat</h1>
            <button
              onClick={() => setCurrentView(currentView === 'user' ? 'verifier' : 'user')}
              className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
            >
              {currentView === 'user' ? (
                <>
                  <Shield className="w-4 h-4" />
                  Switch to Verifier View
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Switch to User View
                </>
              )}
            </button>
          </div>
        </div>

        {currentView === 'user' ? (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t p-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          // Verifier View
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">Pending Verifications</h2>
            {verificationQueue.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                No messages waiting for verification
              </div>
            ) : (
              verificationQueue.map(message => (
                <VerificationItem key={message.id} message={message} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-64 border-l bg-white p-4">
        <div className="sticky top-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">VERIFICATION STATS</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {messages.filter(m => m.status === 'verified').length}
                </div>
                <div className="text-sm text-gray-600">Verified Messages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {verificationQueue.length}
                </div>
                <div className="text-sm text-gray-600">Pending Verification</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-sm font-semibold text-gray-600 mb-4 mt-8">RESPONSE TIMES</h2>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 mb-2">Average Verification Time</div>
              <div className="text-2xl font-bold text-blue-600">2.5 min</div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">VERIFIER STATUS</h2>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-green-50 flex items-center justify-between">
                <span className="text-sm">Compliance Team</span>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                  Online
                </span>
              </div>
              <div className="p-2 rounded-lg bg-gray-50 flex items-center justify-between">
                <span className="text-sm">Legal Team</span>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  2 Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChat;
