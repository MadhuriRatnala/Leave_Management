import React from 'react';

const ApprovalFlow = () => {
  const steps = [
    {
      title: "Notification Review",
      description: "Review incoming leave request notifications",
      details: "The notification includes employee name, leave type, dates, and reason for leave."
    },
    {
      title: "Review Request Details",
      description: "Manager reviews all aspects of the leave request including dates, type, and impact on team workflow.",
      details: "Check team calendar for overlapping leaves and project deadlines."
    },
    {
      title: "Check Documentation",
      description: "Verify that all required supporting documents are attached and valid.",
      details: "Medical certificates, event invitations, or other relevant documentation."
    },
    {
      title: "Make Decision",
      description: "Evaluate the request based on policy guidelines and business requirements.",
      details: "Consider leave balance, notice period, and team coverage."
    },
    {
      title: "Notify Employee",
      description: "Communicate the decision to the employee with appropriate feedback.",
      details: "Provide reason if request is rejected or suggest alternative dates."
    },
    {
      title: "Update Leave Records",
      description: "Ensure all leave records are updated in the system accurately.",
      details: "Update team calendar and department leave tracker."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Leave Approval Process</h2>
      
      <p className="text-gray-600 mb-8">
        For managers and team leads, the leave approval process involves several steps to ensure proper workflow management and fair evaluation of leave requests.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700">
                  {index + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">{step.description}</p>
              <div className="text-sm text-gray-500">
                <strong>Important Details:</strong>
                <p>{step.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalFlow;