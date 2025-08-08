import React from 'react';
import { X } from 'lucide-react';

/**
 * AddEmployeeModal - Popup card form for creating a new employee
 * Props:
 *   open (bool): Whether the modal is visible
 *   onClose (func): Function to close the modal
 *   onSubmit (func): Function to handle form submission
 */
const AddEmployeeModal = ({ open, onClose, onSubmit }) => {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Employee</h2>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            // Construct employee data object
            const employeeData = {
              empCode: formData.get('empCode'),
              name: formData.get('name'),
              role: formData.get('role'),
              contact: formData.get('contact'),
              email: formData.get('email'),
              address: formData.get('address'),
              joiningDate: formData.get('joiningDate')
            };
            
            if (onSubmit) onSubmit(employeeData);
          }}
        >
          {/* 2x2 Grid for Employee Code and Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee Code - Mandatory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Code <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="empCode" 
                placeholder="0001"
                pattern="[0-9]{4}"
                maxLength="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
              <p className="text-xs text-gray-500 mt-1">Format: 0001, 0002, 0003...</p>
            </div>

            {/* Name - Mandatory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input 
                type="text" 
                name="role" 
                placeholder="Manager, Operator, Admin"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input 
                type="tel" 
                name="contact" 
                placeholder="+91 9876543210"
                defaultValue="+91 "
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="john.doe@company.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
              <input 
                type="date" 
                name="joiningDate" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Address - Full Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              name="address" 
              rows={3} 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
              placeholder="Enter full address..." 
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
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
