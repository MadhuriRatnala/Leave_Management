import React from 'react';

const ApplicationFlow = () => {
  const steps = [
    {
      title: 'Fill Application Form',
      description: 'Complete all required fields in the leave application form',
      details: 'Include employee details, leave type, dates, and reason'
    },
    {
      title: 'Submit Request',
      description: 'Submit the completed form for approval',
      details: 'Ensure all information is accurate before submission'
    },
    {
      title: 'Manager Review',
      description: 'Wait for manager to review your application',
      details: 'You will be notified once a decision is made'
    },
    {
      title: 'Track Status',
      description: 'Monitor your leave application status',
      details: 'Check the Leave Status page for updates'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Leave Application Process</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {index + 1}
              </span>
              <h3 className="font-semibold text-lg">{step.title}</h3>
            </div>
            <p className="text-gray-600 mb-2">{step.description}</p>
            <p className="text-sm text-gray-500">{step.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationFlow;

