import React from 'react';
import LeaveApplicationForm from '../pages/LeaveApplicationForm';
import LeavePolicy from '../pages/LeavePolicy';
import LeaveStatus from '../pages/LeaveStatus';
import LeaveReport from '../pages/LeaveReport';

const Home = ({ onLeaveSubmit, applications }) => {
  const sections = [
    {
      id: 'apply',
      title: 'Apply for Leave',
      component: <LeaveApplicationForm onSubmit={onLeaveSubmit} />
    },
    {
      id: 'policy',
      title: 'Leave Policy',
      component: <LeavePolicy />
    },
    {
      id: 'status',
      title: 'Leave Status',
      component: <LeaveStatus applications={applications} />
    },
    {
      id: 'report',
      title: 'Leave Report',
      component: <LeaveReport applications={applications} />
    }
  ];

  return (
    <div className="home">
      <div className="content">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="section"
          >
            <div className="section-content">
              {section.component}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;