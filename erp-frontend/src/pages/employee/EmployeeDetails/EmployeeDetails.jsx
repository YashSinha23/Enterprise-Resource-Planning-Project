import React, { useState, useEffect } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';

// Mock employee data
const initialEmployees = [
  {
    emp_code: '0001',
    name: 'John Doe',
    role: 'Manager',
    contact: '+91-9876543210',
    email: 'john.doe@almed.com',
    address: '123 Main St, City',
    joining_date: '2024-01-15'
  },
  {
    emp_code: '0002',
    name: 'Jane Smith',
    role: 'Operator',
    contact: '+91-9876543211',
    email: 'jane.smith@almed.com',
    address: '456 Oak St, City',
    joining_date: '2024-02-01'
  },
  {
    emp_code: '0003',
    name: 'Mike Johnson',
    role: 'Supervisor',
    contact: '+91-9876543212',
    email: 'mike.johnson@almed.com',
    address: '789 Pine St, City',
    joining_date: '2024-01-20'
  },
  {
    emp_code: '0004',
    name: 'Sarah Wilson',
    role: 'Quality Control',
    contact: '+91-9876543213',
    email: 'sarah.wilson@almed.com',
    address: '321 Elm St, City',
    joining_date: '2024-03-10'
  },
  {
    emp_code: '0005',
    name: 'Robert Brown',
    role: 'Technician',
    contact: '+91-9876543214',
    email: 'robert.brown@almed.com',
    address: '654 Cedar St, City',
    joining_date: '2024-02-15'
  }
];

const EmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState(initialEmployees);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load employees on component mount - now just sets initial data
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 200));
      setEmployees(initialEmployees);
    } catch (err) {
      console.error('Error loading employees:', err);
      setError('Failed to load employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = Array.isArray(employees) ? employees.filter(employee =>
    employee && (
      (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.role && employee.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.emp_code && employee.emp_code.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ) : [];

  const handleAddEmployee = async (employeeData) => {
    try {
      // Validate data before submission
      if (!employeeData || !employeeData.empCode || !employeeData.name) {
        alert('Employee code and name are required');
        return;
      }

      // Check if employee code already exists
      const existingEmployee = employees.find(emp => emp.emp_code === employeeData.empCode);
      if (existingEmployee) {
        alert('Employee code already exists');
        return;
      }

      // Create new employee object
      const newEmployee = {
        emp_code: employeeData.empCode,
        name: employeeData.name,
        role: employeeData.role || '',
        contact: employeeData.contact || '',
        email: employeeData.email || '',
        address: employeeData.address || '',
        joining_date: employeeData.joiningDate || new Date().toISOString().split('T')[0]
      };

      // Add employee to local state
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      
      // Close modal
      setIsAddModalOpen(false);
      
      console.log('New employee added:', newEmployee);
    } catch (err) {
      console.error('Error adding employee:', err);
      alert(err.message || 'Failed to add employee');
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">Loading employees...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 rounded-lg border border-red-200 p-6">
          <div className="text-red-800">{error}</div>
          <button 
            onClick={loadEmployees}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Search and Filter Bar */}
      {!loading && !error && (
        <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Export Button */}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>

              {/* New Employee Button */}
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Employee
              </button>
            </div>
          </div>
        </div>        {/* Employee Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Employee List ({filteredEmployees.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.emp_code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name || 'Unknown')}&background=e5e7eb&color=6b7280`}
                              alt={employee.name || 'Unknown'}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{employee.emp_code || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{employee.email || 'No email'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.role || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.contact || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.joining_date ? new Date(employee.joining_date).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? 'No employees found matching your search.' : 'No employees found. Add some employees to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal 
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeDetails;
