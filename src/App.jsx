import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import LeaveApplicationForm from './pages/LeaveApplicationForm';
import LeavePolicy from './pages/LeavePolicy';
import LeaveStatus from './pages/LeaveStatus';
import LeaveReport from './pages/LeaveReport';
import ApplicationFlow from './pages/ApplicationFlow';
import ApprovalFlow from './pages/ApprovalFlow';
import { ThemeProvider } from './context/themeContext';

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
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/apply" replace />} />
              <Route path="/application-process" element={<ApplicationFlow />} />
              <Route path="/approval-process" element={<ApprovalFlow />} />
              <Route path="/apply" element={<LeaveApplicationForm onSubmit={handleLeaveSubmit} />} />
              <Route path="/policy" element={<LeavePolicy />} />
              <Route path="/status" element={<LeaveStatus applications={applications} />} />
              <Route path="/report" element={<LeaveReport applications={applications} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;