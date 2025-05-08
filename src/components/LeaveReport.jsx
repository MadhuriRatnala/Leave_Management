import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LeaveReport = ({ applications }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leaveQuotas, setLeaveQuotas] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  
  useEffect(() => {
    const quotas = [
      { type: "sick", total: 10, used: 3, remaining: 7 },
      { type: "casual", total: 12, used: 8, remaining: 4 },
      { type: "earned", total: 15, used: 5, remaining: 10 },
      { type: "maternity", total: 180, used: 0, remaining: 180 },
      { type: "paternity", total: 15, used: 0, remaining: 15 }
    ];
    setLeaveQuotas(quotas);
  }, []);
  
  useEffect(() => {
    // Calculate leave types breakdown
    const leaveTypes = {};
    applications?.forEach(app => {
      leaveTypes[app.leaveType] = (leaveTypes[app.leaveType] || 0) + 1;
    });
    
    const formattedLeaveTypes = Object.entries(leaveTypes).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count
    }));
    setLeaveTypeData(formattedLeaveTypes);
    
    // Calculate status breakdown
    const statuses = {};
    applications?.forEach(app => {
      const status = app.status || 'pending';
      statuses[status] = (statuses[status] || 0) + 1;
    });
    
    const formattedStatuses = Object.entries(statuses).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
    setStatusData(formattedStatuses);
    
    // Calculate monthly breakdown
    const months = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    applications?.forEach(app => {
      const startDate = new Date(app.startDate);
      const month = monthNames[startDate.getMonth()];
      months[month] = (months[month] || 0) + 1;
    });
    
    const formattedMonths = monthNames.map(month => ({
      name: month,
      leaves: months[month] || 0
    }));
    setMonthlyData(formattedMonths);
  }, [applications]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  // Calculate total leave days taken
  const totalLeaveDays = applications?.reduce((total, app) => {
    return total + calculateDays(app.startDate, app.endDate);
  }, 0) || 0;

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="details">Detailed Report</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-700">Total Leave Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-company-700">{applications?.length || 0}</p>
                <p className="text-sm text-gray-500 mt-1">All time applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-700">Total Leave Days</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-company-700">{totalLeaveDays}</p>
                <p className="text-sm text-gray-500 mt-1">Days of leave requested</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-700">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-company-700">
                  {applications?.length ? Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Of requests approved</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Leave Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaveTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {leaveTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Leave Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.name === 'Approved' ? '#22c55e' :
                            entry.name === 'Rejected' ? '#ef4444' : '#eab308'
                          } />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Leave Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leaves" name="Leave Applications" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-700 text-sm uppercase border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Leave Type</th>
                      <th className="px-6 py-3">Total Quota</th>
                      <th className="px-6 py-3">Used</th>
                      <th className="px-6 py-3">Remaining</th>
                      <th className="px-6 py-3">Usage %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaveQuotas.map((quota) => (
                      <tr key={quota.type} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium capitalize">{quota.type}</td>
                        <td className="px-6 py-4">{quota.total}</td>
                        <td className="px-6 py-4">{quota.used}</td>
                        <td className="px-6 py-4">{quota.remaining}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-company-600 h-2.5 rounded-full" 
                                style={{ width: `${(quota.used / quota.total) * 100}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {Math.round((quota.used / quota.total) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-700 text-sm uppercase border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Employee</th>
                      <th className="px-6 py-3">Leave Type</th>
                      <th className="px-6 py-3">Start Date</th>
                      <th className="px-6 py-3">End Date</th>
                      <th className="px-6 py-3">Days</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications?.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{app.employeeName}</td>
                        <td className="px-6 py-4 capitalize">{app.leaveType}</td>
                        <td className="px-6 py-4">
                          {new Date(app.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(app.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {calculateDays(app.startDate, app.endDate)}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!applications || applications.length === 0) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No leave applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveReport;
