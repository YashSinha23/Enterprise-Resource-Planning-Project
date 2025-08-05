import React from 'react';

const AttendanceTable = () => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Left for the day':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Employee List</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
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
          <tbody className="divide-y divide-gray-200">
            {attendanceData.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
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
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: '70%' }}></div>
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
  );
};

export default AttendanceTable;