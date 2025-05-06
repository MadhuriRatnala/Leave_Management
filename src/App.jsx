import { useState } from 'react';
import Header from './components/Header';
import LeaveApplicationForm from './components/LeaveApplicationForm';
import LeavePolicy from './components/LeavePolicy';
import LeaveStatus from './components/LeaveStatus';
import LeaveReport from './components/LeaveReport';
import ApplicationFlow from './components/ApplicationFlow';
import ApprovalFlow from './components/ApprovalFlow';

function App() {
  const [currentView, setCurrentView] = useState('application');
  const [applications, setApplications] = useState([]);

  const handleLeaveSubmit = (formData) => {
    const newApplication = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
      )
    );
  };

  const getSectionTitle = () => {
    switch (currentView) {
      case 'application': return 'Apply for Leave';
      case 'policy': return 'Leave Policy';
      case 'applicationFlow': return 'Application Process';
      case 'approvalFlow': return 'Approval Process';
      case 'status': return 'Leave Status';
      case 'report': return 'Leave Report';
      default: return 'Apply for Leave';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'application':
        return <LeaveApplicationForm onSubmit={handleLeaveSubmit} />;
      case 'policy':
        return <LeavePolicy />;
      case 'applicationFlow':
        return <ApplicationFlow />;
      case 'approvalFlow':
        return <ApprovalFlow />;
      case 'status':
        return <LeaveStatus applications={applications} onStatusChange={handleStatusChange} />;
      case 'report':
        return <LeaveReport applications={applications} />;
      default:
        return <LeaveApplicationForm onSubmit={handleLeaveSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-company-800">{getSectionTitle()}</h1>
            <div className="h-1 w-20 bg-company-600 mt-2"></div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;