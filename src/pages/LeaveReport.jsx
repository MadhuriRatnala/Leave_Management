import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LeaveReport = ({ applications }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [monthlyData, setMonthlyData] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    if (applications?.length) {
      // Process leave types
      const leaveTypes = applications.reduce((acc, app) => {
        acc[app.leaveType] = (acc[app.leaveType] || 0) + 1;
        return acc;
      }, {});

      setLeaveTypeData(Object.entries(leaveTypes).map(([name, value]) => ({ name, value })));

      // Process statuses
      const statuses = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      }, {});

      setStatusData(Object.entries(statuses).map(([name, value]) => ({ name, value })));

      // Process monthly data
      const months = {};
      applications.forEach(app => {
        const month = new Date(app.startDate).toLocaleString('default', { month: 'short' });
        months[month] = (months[month] || 0) + 1;
      });

      setMonthlyData(Object.entries(months).map(([name, value]) => ({ name, value })));
    }
  }, [applications]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Leave Report</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('details')}
          >
            Detailed Report
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Total Applications</h3>
                <p className="text-3xl font-bold text-blue-600">{applications?.length || 0}</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Approval Rate</h3>
                <p className="text-3xl font-bold text-green-600">
                  {applications?.length
                    ? Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100)
                    : 0}%
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pending Requests</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {applications?.filter(app => app.status === 'pending').length || 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Types Distribution</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={leaveTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {leaveTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Distribution</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Add detailed report content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveReport;
