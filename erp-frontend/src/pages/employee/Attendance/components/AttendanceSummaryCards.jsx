import React from 'react';

const AttendanceSummaryCards = ({ attendanceSummary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900">{attendanceSummary.total}</p>
            <p className="text-xs text-gray-500 mt-1">All employees</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Present Today</p>
            <p className="text-2xl font-bold text-green-600">{attendanceSummary.present}</p>
            <p className="text-xs text-green-600 mt-1">{Math.round((attendanceSummary.present / attendanceSummary.total) * 100)}% attendance</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{attendanceSummary.absent}</p>
            <p className="text-xs text-red-600 mt-1">{Math.round((attendanceSummary.absent / attendanceSummary.total) * 100)}% absent</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Left Early</p>
            <p className="text-2xl font-bold text-yellow-600">{attendanceSummary.leftEarly}</p>
            <p className="text-xs text-gray-500 mt-1">End of shift</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummaryCards;
