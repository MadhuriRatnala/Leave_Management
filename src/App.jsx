import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LeaveApplicationForm from './components/LeaveApplicationForm';
import LeavePolicy from './components/LeavePolicy';
import LeaveStatus from './components/LeaveStatus';
import LeaveReport from './components/LeaveReport';
import ApplicationFlow from './components/ApplicationFlow';
import ApprovalFlow from './components/ApprovalFlow';

function App() {
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

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/application-process" element={<ApplicationFlow />} />
              <Route path="/approval-process" element={<ApprovalFlow />} />
              <Route path="/apply" element={<LeaveApplicationForm onSubmit={handleLeaveSubmit} />} />
              <Route path="/policy" element={<LeavePolicy />} />
              <Route path="/status" element={<LeaveStatus applications={applications} />} />
              <Route path="/report" element={<LeaveReport applications={applications} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;