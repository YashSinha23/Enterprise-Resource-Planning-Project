import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addEmployee, updateEmployee } from '../../../api/employee.api';

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
  const [error, setError] = useState(null);

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
      setError(null);
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
    setLoading(true);
    setError(null);

    try {
      if (mode === 'edit') {
        // Update existing employee
        await updateEmployee(initialData.emp_code, formData);
      } else {
        // Create new employee
        await addEmployee(formData);
      }
      
      // Refresh the employee list
      await refreshEmployees();
      
      // Close modal
      onClose();
    } catch (err) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} employee:`, err);
      setError(err.message || `Failed to ${mode === 'edit' ? 'update' : 'create'} employee`);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Title */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {mode === 'edit' ? 'Edit Employee' : 'Add New Employee'}
          </h2>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-red-800 text-sm">{error}</div>
            </div>
          )}

          {/* Employee Code */}
          <div>
            <label htmlFor="emp_code" className="block text-sm font-medium text-gray-700 mb-1">
              Employee Code *
            </label>
            <input
              type="text"
              id="emp_code"
              name="emp_code"
              value={formData.emp_code}
              onChange={handleInputChange}
              disabled={mode === 'edit'} // Don't allow editing emp_code
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter role"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact number"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                id="joining_date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Address - Full Width */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter address"
            />
          </div>

          {/* Modal Footer */}
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
