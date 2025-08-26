import React, { useState, useRef, useEffect } from 'react';
import { getShiftColors } from './shiftUtils';

const ShiftAssignmentDropdown = ({ 
  currentShift, 
  shiftTypes, 
  onShiftChange, 
  employeeId, 
  day,
  isReadOnly = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShiftSelect = (shiftCode) => {
    if (isReadOnly) return;
    onShiftChange(employeeId, day, shiftCode);
    setIsOpen(false);
  };

  const currentColors = getShiftColors(currentShift);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !isReadOnly && setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-xs font-medium transition-opacity ${currentColors.bgColor} ${currentColors.textColor} border ${currentColors.borderColor} ${
          isReadOnly ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'
        }`}
        disabled={isReadOnly}
      >
        {currentShift || '-'}
      </button>

      {isOpen && !isReadOnly && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 min-w-[200px]">
          <div className="grid grid-cols-2 gap-2">
            
            {/* Dynamic shift options */}
            {shiftTypes.map((shift) => {
              const colors = getShiftColors(shift.shift_code);
              return (
                <button
                  key={shift.shift_code}
                  onClick={() => handleShiftSelect(shift.shift_code)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors group"
                >
                  <div className={`w-6 h-6 ${colors.bgColor} border-2 ${colors.borderColor} rounded-full mb-2`}></div>
                  <span className="text-xs font-medium text-gray-700">{shift.shift_code}</span>
                  <span className="text-xs text-gray-500">{shift.shift_name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftAssignmentDropdown;
