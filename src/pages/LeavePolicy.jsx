import React, { useState } from 'react';

const LeavePolicy = () => {
  const [activeTab, setActiveTab] = useState('quotas');

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Leave Policy</h2>
      
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 ${activeTab === 'quotas' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('quotas')}
        >
          Leave Quotas
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'eligibility' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('eligibility')}
        >
          Eligibility
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'rules' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Rules & Guidelines
        </button>
      </div>

      {/* Rest of the content remains the same, just remove Card, CardHeader, etc. components */}
    </div>
  );
};

export default LeavePolicy;