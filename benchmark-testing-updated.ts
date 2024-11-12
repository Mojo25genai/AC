// Update in the benchmarkPrompts section:

const benchmarkPrompts = [
    {
      id: 1,
      name: 'Customer Data Handling',
      category: 'Security',
      status: 'approved',
      results: {
        'gpt-3.5': { accuracy: 92, latency: 0.8, cost: 0.03 },
        'gpt-4': { accuracy: 97, latency: 1.12, cost: 0.042 }  // 40% higher
      },
      approvals: {
        user: 'approved',
        legal: 'approved',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'approved',
        mrm: 'approved',
        cto: 'approved'
      }
    },
    {
      id: 2,
      name: 'Code Review Standards',
      category: 'Development',
      status: 'partial',
      results: {
        'gpt-3.5': { accuracy: 88, latency: 0.7, cost: 0.02 },
        'gpt-4': { accuracy: 95, latency: 0.98, cost: 0.028 }  // 40% higher
      },
      approvals: {
        user: 'approved',
        legal: 'approved',
        'it-risk': 'pending',
        cyber: 'approved',
        compliance: 'approved',
        mrm: 'pending',
        cto: 'approved'
      }
    },
    {
      id: 3,
      name: 'Market Analysis Template',
      category: 'Analytics',
      status: 'pending',
      results: {
        'gpt-3.5': { accuracy: 90, latency: 0.9, cost: 0.03 },
        'gpt-4': { accuracy: 96, latency: 1.26, cost: 0.042 }  // 40% higher
      },
      approvals: {
        user: 'approved',
        legal: 'pending',
        'it-risk': 'approved',
        cyber: 'approved',
        compliance: 'pending',
        mrm: 'approved',
        cto: 'approved'
      }
    }
];

// Update the sidebar averages
const modelAverages = {
  'gpt-3.5': {
    accuracy: '90.0%',
    latency: '0.80s',
    cost: '$0.027'
  },
  'gpt-4': {
    accuracy: '96.0%',
    latency: '1.12s',
    cost: '$0.037'
  }
};
