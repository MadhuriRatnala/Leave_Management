import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from "../components/ui/use-toast";
import Heading from './ui/heading';

const LeaveStatus = ({ applications = [], onStatusChange }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isManager, setIsManager] = useState(false);

  const filteredApplications = (applications || []).filter(app => {
    const matchesSearch = 
      app.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleStatusChange = (id, newStatus) => {
    onStatusChange(id, newStatus);
    toast({
      title: "Leave request " + newStatus,
      description: `The leave request has been ${newStatus} successfully.`,
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return "bg-green-100 text-green-800 border border-green-200";
      case 'rejected':
        return "bg-red-100 text-red-800 border border-red-200";
      case 'pending':
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      <Heading variant="h2" color="primary" className="mb-6">
        Leave Status
      </Heading>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search section */}
        <div className="flex-1 space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search Applications
          </label>
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, leave type, or reason..."
            className="max-w-md"
          />
        </div>
        
        {/* Filter section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2">
            <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-company-500 focus:outline-none focus:ring-company-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="md:self-end">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="managerMode"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
                className="rounded border-gray-300 text-company-600 focus:ring-company-500"
              />
              <label htmlFor="managerMode" className="text-sm font-medium text-gray-700">
                Manager Mode
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Applications table */}
      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No leave applications found matching your filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Employee Name</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">Date Range</th>
                <th className="px-6 py-3">Days</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Status</th>
                {isManager && <th className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{app.employeeName}</td>
                  <td className="px-6 py-4 capitalize">{app.leaveType}</td>
                  <td className="px-6 py-4">
                    {formatDate(app.startDate)} - {formatDate(app.endDate)}
                  </td>
                  <td className="px-6 py-4">
                    {calculateDays(app.startDate, app.endDate)}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={app.reason}>
                    {app.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  {isManager && (
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 hover:bg-green-50 text-green-700 text-xs"
                          disabled={app.status !== 'pending'}
                          onClick={() => app.id && handleStatusChange(app.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 hover:bg-red-50 text-red-700 text-xs"
                          disabled={app.status !== 'pending'}
                          onClick={() => app.id && handleStatusChange(app.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manager instructions */}
      {isManager && (
        <div className="bg-company-50 p-4 rounded-md text-sm">
          <h4 className="font-medium text-company-800 mb-2">Manager Instructions:</h4>
          <p className="text-gray-700">
            As a manager, you can approve or reject pending leave applications.
            Once a decision is made, it cannot be changed in this system.
            Please ensure you review all details carefully before making a decision.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveStatus;
