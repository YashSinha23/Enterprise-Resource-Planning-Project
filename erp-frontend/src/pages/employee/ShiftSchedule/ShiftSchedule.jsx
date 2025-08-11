import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Edit3 } from 'lucide-react';
import EditShiftMasterModal from './EditShiftMasterModal';

const ShiftSchedule = () => {
  const [currentMonth, setCurrentMonth] = useState('July 2024');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Sample employee data matching the image
  const employees = [
    {
      id: 'EMP-00123',
      name: 'Jane Cooper',
      photo: '/api/placeholder/32/32',
      shifts: {
        1: 'M', 2: 'M', 3: 'A', 4: 'A', 5: 'N', 6: 'OFF', 7: 'OFF', 8: 'M', 9: 'M', 10: 'A',
        11: 'A', 12: 'N', 13: 'N', 14: 'OFF', 15: 'OFF', 16: 'M', 17: 'M', 18: 'A', 19: 'A', 20: 'N',
        21: 'N', 22: 'OFF', 23: 'OFF', 24: 'M', 25: 'M', 26: 'A', 27: 'A', 28: 'N', 29: 'N', 30: 'OFF', 31: 'OFF'
      }
    },
    {
      id: 'EMP-00124',
      name: 'Cody Fisher',
      photo: '/api/placeholder/32/32',
      shifts: {
        1: 'OFF', 2: 'OFF', 3: 'M', 4: 'M', 5: 'A', 6: 'A', 7: 'N', 8: 'OFF', 9: 'OFF', 10: 'M',
        11: 'M', 12: 'A', 13: 'A', 14: 'N', 15: 'N', 16: 'OFF', 17: 'OFF', 18: 'M', 19: 'M', 20: 'A',
        21: 'A', 22: 'N', 23: 'N', 24: 'OFF', 25: 'OFF', 26: 'M', 27: 'M', 28: 'A', 29: 'A', 30: 'N', 31: 'N'
      }
    },
    {
      id: 'EMP-00125',
      name: 'Esther Howard',
      photo: '/api/placeholder/32/32',
      shifts: {
        1: 'N', 2: 'N', 3: 'OFF', 4: 'OFF', 5: 'M', 6: 'M', 7: 'A', 8: 'A', 9: 'N', 10: 'N',
        11: 'OFF', 12: 'OFF', 13: 'M', 14: 'M', 15: 'A', 16: 'A', 17: 'N', 18: 'N', 19: 'OFF', 20: 'OFF',
        21: 'M', 22: 'M', 23: 'A', 24: 'A', 25: 'N', 26: 'N', 27: 'OFF', 28: 'OFF', 29: 'M', 30: 'M', 31: 'A'
      }
    },
    {
      id: 'EMP-00126',
      name: 'Jenny Wilson',
      photo: '/api/placeholder/32/32',
      shifts: {
        1: 'M', 2: 'A', 3: 'N', 4: 'OFF', 5: 'OFF', 6: 'M', 7: 'M', 8: 'A', 9: 'A', 10: 'N',
        11: 'N', 12: 'OFF', 13: 'OFF', 14: 'M', 15: 'M', 16: 'A', 17: 'A', 18: 'N', 19: 'N', 20: 'OFF',
        21: 'OFF', 22: 'M', 23: 'M', 24: 'A', 25: 'A', 26: 'N', 27: 'N', 28: 'OFF', 29: 'OFF', 30: 'M', 31: 'M'
      }
    },
    {
      id: 'EMP-00127',
      name: 'Cameron Williamson',
      photo: '/api/placeholder/32/32',
      shifts: {
        1: 'A', 2: 'N', 3: 'OFF', 4: 'OFF', 5: 'M', 6: 'M', 7: 'A', 8: 'A', 9: 'N', 10: 'OFF',
        11: 'OFF', 12: 'M', 13: 'M', 14: 'A', 15: 'A', 16: 'N', 17: 'N', 18: 'OFF', 19: 'OFF', 20: 'M',
        21: 'M', 22: 'A', 23: 'A', 24: 'N', 25: 'N', 26: 'OFF', 27: 'OFF', 28: 'M', 29: 'M', 30: 'A', 31: 'A'
      }
    }
  ];

  const getShiftStyle = (shift) => {
    switch (shift) {
      case 'M':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'A':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'N':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'OFF':
        return 'bg-gray-100 text-gray-600 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-400 border border-gray-200';
    }
  };

  const navigateMonth = (direction) => {
    // This would handle month navigation in a real implementation
    console.log(`Navigate ${direction}`);
  };

  const handleExport = () => {
    console.log('Export shift schedule');
  };

  const handleEditShiftMaster = () => {
    setIsEditModalOpen(true);
  };

  // Generate array for days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Header with Month Navigation and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">{currentMonth}</h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <Download className="h-4 w-4 text-gray-600" />
            <span>Export</span>
          </button>
          <button
            onClick={handleEditShiftMaster}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Shift Master</span>
          </button>
        </div>
      </div>

      {/* Shift Legend */}
      <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">M: Morning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
          <span className="text-sm text-gray-600">A: Afternoon</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">N: Night</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
          <span className="text-sm text-gray-600">OFF: Day Off</span>
        </div>
      </div>

      {/* Shift Schedule Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Employee
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[50px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  {days.map((day) => (
                    <td key={day} className="px-3 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium min-w-[32px] ${getShiftStyle(
                          employee.shifts[day]
                        )}`}
                      >
                        {employee.shifts[day]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Shift Master Modal */}
      <EditShiftMasterModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ShiftSchedule;
