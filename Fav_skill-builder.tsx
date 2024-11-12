import React, { useState } from 'react';
import { 
  ChevronDown, 
  ThumbsUp, 
  Shield, 
  Code, 
  Briefcase,
  Copy,
  CheckCircle2,
  GraduationCap,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JobFamilySkillBuilder = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const jobFamilies = [
    { 
      value: 'technology',
      label: 'Technology',
      roles: [
        { value: 'developer', label: 'Software Developer', count: 1567 },
        { value: 'architect', label: 'Solution Architect', count: 654 },
        { value: 'scrum-master', label: 'Scrum Master', count: 856 },
        { value: 'devops', label: 'DevOps Engineer', count: 432 }
      ]
    },
    {
      value: 'business',
      label: 'Business',
      roles: [
        { value: 'business-analyst', label: 'Business Analyst', count: 789 },
        { value: 'product-owner', label: 'Product Owner', count: 567 },
        { value: 'project-manager', label: 'Project Manager', count: 890 }
      ]
    },
    {
      value: 'design',
      label: 'Design',
      roles: [
        { value: 'ux-designer', label: 'UX Designer', count: 345 },
        { value: 'ui-designer', label: 'UI Designer', count: 234 },
        { value: 'product-designer', label: 'Product Designer', count: 456 }
      ]
    }
  ];

  const skillCategories = [
    { 
      value: 'technical',
      label: 'Technical Skills',
      skills: [
        { value: 'coding', label: 'Programming & Coding', count: 789 },
        { value: 'architecture', label: 'System Architecture', count: 567 },
        { value: 'cloud', label: 'Cloud Computing', count: 890 }
      ]
    },
    {
      value: 'process',
      label: 'Process & Methodologies',
      skills: [
        { value: 'agile', label: 'Agile Practices', count: 678 },
        { value: 'devops', label: 'DevOps Practices', count: 456 },
        { value: 'requirements', label: 'Requirements Gathering', count: 345 }
      ]
    },
    {
      value: 'soft',
      label: 'Soft Skills',
      skills: [
        { value: 'communication', label: 'Communication', count: 234 },
        { value: 'leadership', label: 'Leadership', count: 567 },
        { value: 'collaboration', label: 'Collaboration', count: 789 }
      ]
    }
  ];

  const outputs = [
    { value: 'learning-path', label: 'Learning Path', count: 567 },
    { value: 'skill-matrix', label: 'Skill Matrix', count: 456 },
    { value: 'certification-guide', label: 'Certification Guide', count: 345 },
    { value: 'workshop', label: 'Workshop Material', count: 234 },
    { value: 'assessment', label: 'Skill Assessment', count: 189 }
  ];

  const popularPathways = [
    {
      role: 'developer',
      skill: 'coding',
      output: 'learning-path',
      upvotes: 234,
      isApproved: true,
      description: 'Full Stack Development Career Path'
    },
    {
      role: 'scrum-master',
      skill: 'agile',
      output: 'certification-guide',
      upvotes: 189,
      isApproved: true,
      description: 'Agile Certification Roadmap'
    },
    {
      role: 'architect',
      skill: 'cloud',
      output: 'skill-matrix',
      upvotes: 156,
      isApproved: true,
      description: 'Cloud Architecture Progression'
    }
  ];

  const generateLearningPath = () => {
    const allRoles = jobFamilies.flatMap(family => family.roles);
    const allSkills = skillCategories.flatMap(category => category.skills);
    
    const role = allRoles.find(r => r.value === selectedRole)?.label;
    const skill = allSkills.find(s => s.value === selectedSkill)?.label;
    const output = outputs.find(o => o.value === outputFormat)?.label;
    
    return `Create a personalized ${output?.toLowerCase()} for a ${role} focusing on ${skill?.toLowerCase()}, with the specific goal to ${learningGoal}.`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Job Family Aligned Skill Builder</h1>
          <p className="text-gray-600">Build personalized learning paths and skill development guides</p>
        </div>
        <button 
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50"
        >
          <Code className="w-4 h-4" />
          {showCode ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <CardTitle>Configure Your Learning Path</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                Select Your Role
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Choose a role</option>
                  {jobFamilies.map(family => (
                    <optgroup key={family.value} label={family.label}>
                      {family.roles.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label} ({role.count} paths)
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Skill Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Target className="w-4 h-4 text-gray-500" />
                Select Skill Focus
              </label>
              <div className="relative">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Choose a skill area</option>
                  {skillCategories.map(category => (
                    <optgroup key={category.value} label={category.label}>
                      {category.skills.map(skill => (
                        <option key={skill.value} value={skill.value}>
                          {skill.label} ({skill.count} paths)
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Target className="w-4 h-4 text-gray-500" />
                Specific Learning Goal
              </label>
              <input
                type="text"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                placeholder="e.g., become proficient in cloud architecture within 6 months"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Output Format */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                Delivery Format
              </label>
              <div className="relative">
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full p-2 border rounded-md appearance-none bg-white pr-10"
                >
                  <option value="">Select output format</option>
                  {outputs.map(output => (
                    <option key={output.value} value={output.value}>
                      {output.label} ({output.count} uses)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Pathways */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <CardTitle>Popular Pathways</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPathways.map((pathway, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedRole(pathway.role);
                    setSelectedSkill(pathway.skill);
                    setOutputFormat(pathway.output);
                  }}
                  className="w-full p-3 rounded-lg border hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{pathway.description}</span>
                    {pathway.isApproved && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {pathway.upvotes}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Path */}
      {(selectedRole && selectedSkill && outputFormat) && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Generated Learning Path Request</h3>
                <p className="text-gray-600">{generateLearningPath()}</p>
              </div>
              <button
                onClick={() => handleCopy(generateLearningPath())}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {showCode && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <pre className="text-sm">{JSON.stringify({
                  role: selectedRole,
                  skill: selectedSkill,
                  goal: learningGoal,
                  output: outputFormat
                }, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobFamilySkillBuilder;
