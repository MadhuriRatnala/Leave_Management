import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Heading from './ui/heading';

const ApprovalFlow = () => {
  const steps = [
    {
      title: "Receive Leave Request",
      description: "Manager receives notification of a new leave application submitted by an employee.",
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
    <>
      <Heading variant="h2" color="primary" className="mb-6">
        Leave Approval Process
      </Heading>
      <div className="space-y-6">
        <p className="text-gray-600">
          For managers and team leads, the leave approval process involves several steps to ensure proper workflow management and fair evaluation of leave requests.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-company-100 text-company-700">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600">{step.description}</p>
                <div className="text-sm text-gray-500">
                  <strong>Important Details:</strong>
                  <p>{step.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ApprovalFlow;