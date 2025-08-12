import React, { useState, useEffect } from 'react';
import { addShift, getAllShifts } from '../../../api/shift.api';
import { X, Edit3, Plus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';


const EditShiftMasterModal = ({ isOpen, onClose }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    shiftCode: '',
    shiftName: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shifts, setShifts] = useState([]);
  const [fetchingShifts, setFetchingShifts] = useState(false);

  // Fetch shifts when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchShifts();
    }
  }, [isOpen]);

  const fetchShifts = async () => {
    setFetchingShifts(true);
    try {
      const response = await getAllShifts();
      setShifts(response.shifts || []);
    } catch (err) {
      console.error('Error fetching shifts:', err);
      toast.error('Failed to load shifts');
    } finally {
      setFetchingShifts(false);
    }
  };

  // Function to format time from 24-hour to 12-hour format
  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Function to get shift colors based on shift code or name
  const getShiftColors = (shiftCode, shiftName) => {
    const code = shiftCode?.toUpperCase();
    const name = shiftName?.toLowerCase();
    
    if (code === 'M' || name?.includes('morning')) {
      return {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200'
      };
    } else if (code === 'A' || name?.includes('afternoon') || name?.includes('evening')) {
      return {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200'
      };
    } else if (code === 'N' || name?.includes('night')) {
      return {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200'
      };
    } else {
      return {
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200'
      };
    }
  };

  if (!isOpen) return null;

  const handleEditShift = (shiftId) => {
    console.log(`Edit shift: ${shiftId}`);
    // This will be implemented later
  };

  const handleAddNewShift = () => {
    setShowAddForm(true);
  };

  const handleBackToList = () => {
    setShowAddForm(false);
    setFormData({
      shiftCode: '',
      shiftName: '',
      startTime: '',
      endTime: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleSaveShift = async () => {
    setLoading(true);
    setError('');
    try {
      await addShift(formData);
      toast.success(`Shift "${formData.shiftName}" has been added successfully`, {
        icon: '🕒',
      });
      handleBackToList();
      // Refresh the shifts list
      await fetchShifts();
    } catch (err) {
      console.error('Error adding shift:', err);
      
      // Handle specific error types
      if (err.message.includes('already exists') || err.message.includes('DUPLICATE')) {
        toast.error(`Shift code '${formData.shiftCode}' is already taken. Please use a different code.`);
      } else if (err.message.includes('MISSING_REQUIRED_FIELDS')) {
        toast.error('Please fill in all required fields.');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        toast.error('Network error. Please check your internet connection and try again.');
      } else {
        toast.error(err.message || 'Failed to add shift. Please try again.');
      }
      
      setError(err.message || 'Failed to add shift');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      // Reset form when closing
      setShowAddForm(false);
      setFormData({
        shiftCode: '',
        shiftName: '',
        startTime: '',
        endTime: ''
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              {showAddForm && (
                <button
                  onClick={handleBackToList}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {showAddForm ? 'Add New Shift' : 'Shift Master'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {error && (
              <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>
            )}
            {!showAddForm ? (
              // Shift List View
              <>
                {fetchingShifts ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-gray-500">Loading shifts...</div>
                  </div>
                ) : shifts.length > 0 ? (
                  <div className="space-y-4">
                    {shifts.map((shift) => {
                      const colors = getShiftColors(shift.shift_code, shift.shift_name);
                      const timeRange = `${formatTime(shift.start_time)} - ${formatTime(shift.end_time)}`;
                      
                      return (
                        <div
                          key={shift.id}
                          className={`p-4 rounded-lg border ${colors.bgColor} ${colors.borderColor}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-medium ${colors.textColor}`}>
                                  {shift.shift_name} ({shift.shift_code})
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600">{timeRange}</p>
                            </div>
                            <button
                              onClick={() => handleEditShift(shift.id)}
                              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-2">No shifts found</div>
                    <div className="text-sm text-gray-400">Add your first shift to get started</div>
                  </div>
                )}

                {/* Add New Shift Button */}
                <div className="mt-6">
                  <button
                    onClick={handleAddNewShift}
                    className="w-full flex items-center justify-center space-x-2 p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
                  >
                    <Plus className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-gray-600 group-hover:text-blue-600 font-medium">
                      Add New Shift
                    </span>
                  </button>
                </div>
              </>
            ) : (
              // Add New Shift Form View
              <div className="space-y-6">
                {/* Shift Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shift Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.shiftCode}
                    onChange={(e) => handleInputChange('shiftCode', e.target.value)}
                    placeholder="e.g., M, A, N, E"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Shift Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shift Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.shiftName}
                    onChange={(e) => handleInputChange('shiftName', e.target.value)}
                    placeholder="e.g., Morning Shift, Evening Shift"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 top-0 flex items-center pr-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 top-0 flex items-center pr-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 flex-shrink-0">
            {!showAddForm ? (
              // Shift List Footer
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              // Add Form Footer
              <>
                <button
                  onClick={handleBackToList}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveShift}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={loading || !formData.shiftCode || !formData.shiftName || !formData.startTime || !formData.endTime}
                >
                  {loading ? 'Adding...' : 'Add Shift'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShiftMasterModal;
