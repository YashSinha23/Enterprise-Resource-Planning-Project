import React from 'react';
import { Calendar } from 'lucide-react';

const ShiftSchedule = () => {
  return (
    <div className="text-center py-12">
      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Shift Schedule</h3>
      <p className="text-gray-600">Shift scheduling features will be available soon.</p>
    </div>
  );
};

export default ShiftSchedule;
