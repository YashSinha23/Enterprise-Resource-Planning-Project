import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Edit, Trash2, Clock, Calendar, Download } from 'lucide-react';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('Employee Details');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample employee data
  const employees = [
    {
      id: 'EMP-00123',
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      role: 'Production Manager',
      contact: '+1-202-555-0170',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    {
      id: 'EMP-00124',
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      role: 'Assembly Worker',
      contact: '+1-202-555-0191',
      status: 'Active',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cody'
    },
    {
      id: 'EMP-00125',
      name: 'Esther Howard',
      email: 'esther.howard@example.com',
      role: 'Quality Control',
      contact: '+1-202-555-0127',
      status: 'On Leave',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther'
    }
  ];

  // Sample attendance data
  const attendanceData = [
    {
      id: '39488846',
      name: 'Bagus Fikri',
      clockIn: '10:02 AM',
      clockOut: '07:00 PM',
      overtime: '2h 12m',
      status: 'Present',
      notes: 'Discussed mutual value proposition...',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bagus'
    },
    {
      id: '34534543',
      name: 'Ihdzain',
      clockIn: '09:30 AM',
      clockOut: '07:12 PM',
      overtime: '-',
      status: 'Present',
      notes: 'Tynisha is already lined up for th...',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ihdzain'
    },
    {
      id: '82747837',
      name: 'Mufli Hidayat',
      clockIn: '09:24 AM',
      clockOut: '05:00 PM',
      overtime: '-',
      status: 'Left for the day',
      notes: 'Marci is already doing some gre...',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mufli'
    },
    {
      id: '39488844',
      name: 'Fauzan Ardiansyah',
      clockIn: '08:56 AM',
      clockOut: '05:01 PM',
      overtime: '-',
      status: 'Absent',
      notes: 'Tynisha is already lined up for th...',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fauzan'
    },
    {
      id: '93884744',
      name: 'Raihan Fikri',
      clockIn: '08:56 AM',
      clockOut: '07:00 PM',
      overtime: '1h 05m',
      status: 'Present',
      notes: 'Discussed mutual value proposi...',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raihan'
    }
  ];

  const tabs = ['Employee Details', 'Attendance', 'Shift Schedule', 'Work Time'];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Left for the day':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderEmployeeDetails = () => (
    <div className="space-y-6">
      {/* Employee Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.id}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                        title="Edit Employee"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                        title="Delete Employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
              <span className="font-medium">25</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors duration-150">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors duration-150">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">50</p>
              <p className="text-xs text-gray-500 mt-1">All employees</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">42</p>
              <p className="text-xs text-green-600 mt-1">+5 vs yesterday</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">5</p>
              <p className="text-xs text-red-600 mt-1">-2 vs yesterday</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-xs text-gray-500 mt-1">No change</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Employee List</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock In & Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {attendanceData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">{employee.clockIn}</span>
                      <span className="text-gray-400">—</span>
                      <span className="text-sm text-gray-900">{employee.clockOut}</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: '70%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.overtime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {employee.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Employee Details':
        return renderEmployeeDetails();
      case 'Attendance':
        return renderAttendance();
      case 'Shift Schedule':
        return (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Shift Schedule</h3>
            <p className="text-gray-600">Shift scheduling features will be available soon.</p>
          </div>
        );
      case 'Work Time':
        return (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Work Time</h3>
            <p className="text-gray-600">Work time tracking features will be available soon.</p>
          </div>
        );
      default:
        return renderEmployeeDetails();
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            {/* Employee Icon */}
            <div className="flex-shrink-0">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            
            {/* Page Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600 mt-1">Manage all employee-related activities and information.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
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

            {/* Filter Dropdowns and Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Status Filter Dropdown */}
              <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Statuses</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>

              {/* Department Filter Dropdown */}
              <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Departments</option>
                <option>Production</option>
                <option>Quality Control</option>
                <option>Assembly</option>
                <option>Management</option>
              </select>

              {/* Export Button */}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>

              {/* New Employee Button */}
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <Plus className="h-4 w-4 mr-2" />
                New Employee
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 rounded-t-lg border border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg border-l border-r border-b border-gray-200 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Attendance;