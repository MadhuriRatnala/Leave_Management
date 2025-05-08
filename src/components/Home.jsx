import React from 'react';
import LeaveApplicationForm from './LeaveApplicationForm';
import LeavePolicy from './LeavePolicy';
import LeaveStatus from './LeaveStatus';
import LeaveReport from './LeaveReport';

const Home = () => {
  const sections = [
    {
      id: 'apply',
      title: 'Apply for Leave',
      component: <LeaveApplicationForm />
    },
    {
      id: 'policy',
      title: 'Leave Policy',
      component: <LeavePolicy />
    },
    {
      id: 'status',
      title: 'Leave Status',
      component: <LeaveStatus />
    },
    {
      id: 'report',
      title: 'Leave Report',
      component: <LeaveReport />
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="py-4">
                {section.component}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;