'use client'

import { useState } from 'react';
import ComplianceChat from '@/components/screens/ComplianceChat';
import PromptApprovalList from '@/components/screens/PromptApprovalList';
import PromptBuilder from '@/components/screens/PromptBuilder';
import WorkflowBuilder from '@/components/screens/WorkflowBuilder';

const screens = {
  compliance: ComplianceChat,
  approval: PromptApprovalList,
  builder: PromptBuilder,
  workflow: WorkflowBuilder
};

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('approval');
  
  const Screen = screens[currentScreen];
  
  return (
    <main className="min-h-screen">
      <Screen />
    </main>
  );
}
