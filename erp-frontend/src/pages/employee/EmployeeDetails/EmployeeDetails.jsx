import React, { useState } from 'react';
import { Search, Download, Plus } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';

const EmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Production Manager',
      contact: '+1 234-567-8901',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Quality Control',
      contact: '+1 234-567-8902',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Assembly Worker',
      contact: '+1 234-567-8903',
      status: 'On Leave',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    {
      id: 'EMP004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'HR Manager',
      contact: '+1 234-567-8904',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 'EMP005',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'Machine Operator',
      contact: '+1 234-567-8905',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    }
  ]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (e) => {
    const formData = new FormData(e.target);
    const newEmployee = {
      id: formData.get('empCode'),
      name: formData.get('name'),
      email: formData.get('email') || '',
      role: formData.get('role') || '',
      contact: formData.get('contact') || '',
      status: 'Active',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.get('name'))}`
    };
    
    // Add the new employee to the list
    setEmployees(prev => [...prev, newEmployee]);
    setIsAddModalOpen(false);
    
    // You can add success notification here
    console.log('New employee added:', newEmployee);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
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
      </div>

      {/* Employee Table */}
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=e5e7eb&color=6b7280`;
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
