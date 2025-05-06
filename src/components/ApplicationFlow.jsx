import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from "./ui/use-toast";

const LeaveApplicationForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }
    
    if (!formData.leaveType) {
      newErrors.leaveType = 'Leave type is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: "Leave application submitted",
        description: "Your leave request has been submitted successfully.",
      });
      
      // Reset form
      setFormData({
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
      });
    } else {
      toast({
        title: "Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
            Employee Name
          </label>
          <Input
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.employeeName ? "border-red-500" : ""}
          />
          {errors.employeeName && (
            <p className="text-red-500 text-sm">{errors.employeeName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.leaveType ? "border-red-500" : "border-gray-300"
            } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-company-500 focus:outline-none focus:ring-company-500`}
          >
            <option value="">Select leave type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
          {errors.leaveType && (
            <p className="text-red-500 text-sm">{errors.leaveType}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={errors.startDate ? "border-red-500" : ""}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate || new Date().toISOString().split('T')[0]}
            className={errors.endDate ? "border-red-500" : ""}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Leave
        </label>
        <Textarea
          id="reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          placeholder="Please provide a detailed reason for your leave request"
          className={errors.reason ? "border-red-500" : ""}
        />
        {errors.reason && (
          <p className="text-red-500 text-sm">{errors.reason}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-company-600 hover:bg-company-700"
        >
          Submit Leave Application
        </Button>
      </div>
    </form>
  );
};

export default LeaveApplicationForm;
