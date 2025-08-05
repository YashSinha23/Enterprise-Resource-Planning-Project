import React from 'react';

const TimeBar = ({ clockIn, clockOut, totalHours = 8 }) => {
  // Calculate the percentage of the day worked
  const getWorkProgress = () => {
    if (!clockIn || !clockOut) return 0;
    
    // Simple calculation for demo purposes
    // In a real app, you'd parse the times and calculate actual hours
    const clockInHour = parseInt(clockIn.split(':')[0]);
    const clockOutHour = parseInt(clockOut.split(':')[0]);
    const hoursWorked = clockOutHour - clockInHour;
    
    return Math.min((hoursWorked / totalHours) * 100, 100);
  };

  const progress = getWorkProgress();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>{clockIn}</span>
        <span>{clockOut}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimeBar;