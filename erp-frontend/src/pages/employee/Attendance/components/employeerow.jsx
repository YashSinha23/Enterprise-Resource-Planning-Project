import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const EmployeeRow = ({ employee }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
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
          <button className="text-blue-600 hover:text-blue-900">
            <Edit className="h-4 w-4" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;