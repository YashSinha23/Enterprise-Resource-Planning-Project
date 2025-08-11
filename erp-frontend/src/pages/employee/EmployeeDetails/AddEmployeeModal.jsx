import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addEmployee, updateEmployee } from '../../../api/employee.api';
import toast from 'react-hot-toast';

const AddEmployeeModal = ({ 
  open, 
  onClose, 
  refreshEmployees, 
  mode = 'add', 
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    emp_code: '',
    name: '',
    role: '',
    email: '',
    contact: '',
    joining_date: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        // Pre-fill form with existing data
        setFormData({
          emp_code: initialData.emp_code || '',
          name: initialData.name || '',
          role: initialData.role || '',
          email: initialData.email || '',
          contact: initialData.contact || '',
          joining_date: initialData.joining_date ? initialData.joining_date.split('T')[0] : '',
          address: initialData.address || ''
        });
      } else {
        // Reset form for add mode
        setFormData({
          emp_code: '',
          name: '',
          role: '',
          email: '',
          contact: '',
          joining_date: '',
          address: ''
        });
      }
    }
  }, [open, mode, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.emp_code) {
      toast.error('Please fill in all required fields (Employee Code and Full Name)');
      return;
    }

    try {
      setLoading(true);
      
      if (mode === 'edit') {
        // Update existing employee
        await updateEmployee(initialData.emp_code, formData);
        toast.success(`${formData.name} has been updated successfully`, {
          icon: '✏️',
        });
      } else {
        // Create new employee
        await addEmployee(formData);
        toast.success(`${formData.name} has been added successfully`, {
          icon: '👤',
        });
      }
      
      // Refresh the employee list
      await refreshEmployees();
      
      // Close modal
      onClose();
    } catch (err) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} employee:`, err);
      
      // Handle specific error types
      if (err.message.includes('already exists') || err.message.includes('DUPLICATE_EMP_CODE')) {
        toast.error(`Employee code '${formData.emp_code}' is already taken. Please use a different code.`);
      } else if (err.message.includes('MISSING_REQUIRED_FIELDS')) {
        toast.error('Please fill in all required fields (Employee Code and Full Name).');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        toast.error('Network error. Please check your internet connection and try again.');
      } else {
        toast.error(err.message || `Failed to ${mode === 'edit' ? 'update' : 'add'} employee. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {mode === 'edit' ? 'Edit Employee' : 'Add New Employee'}
        </h2>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Employee Code - Full Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code *</label>
            <input 
              type="text"
              name="emp_code"
              value={formData.emp_code}
              onChange={handleInputChange}
              disabled={mode === 'edit'}
              required
              className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter employee code"
            />
            {mode === 'edit' && (
              <p className="text-xs text-gray-500 mt-1">Employee code cannot be changed</p>
            )}
          </div>

          {/* 2x2 Grid for main fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input 
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input 
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <input 
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address - Full Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter address"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (mode === 'edit' ? 'Update Employee' : 'Add Employee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
