// Utility functions for attendance management

export const getStatusColor = (status) => {
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
    case 'Inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const calculateOvertime = (clockIn, clockOut, regularHours = 8) => {
  // Simple calculation for demo purposes
  // In a real app, you'd use proper date/time parsing
  try {
    const clockInHour = parseInt(clockIn.split(':')[0]);
    const clockOutHour = parseInt(clockOut.split(':')[0]);
    const hoursWorked = clockOutHour - clockInHour;
    
    const overtime = hoursWorked - regularHours;
    return overtime > 0 ? `${overtime}h` : '-';
  } catch (error) {
    return '-';
  }
};

export const formatTime = (timeString) => {
  // Format time string for consistent display
  try {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes} ${period}`;
  } catch (error) {
    return timeString;
  }
};

export const calculateWorkProgress = (clockIn, clockOut, totalHours = 8) => {
  try {
    const clockInHour = parseInt(clockIn.split(':')[0]);
    const clockOutHour = parseInt(clockOut.split(':')[0]);
    const hoursWorked = clockOutHour - clockInHour;
    
    return Math.min((hoursWorked / totalHours) * 100, 100);
  } catch (error) {
    return 0;
  }
};

export const filterEmployees = (employees, searchTerm) => {
  if (!searchTerm) return employees;
  
  return employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const generateAvatar = (name) => {
  const seed = name.replace(/\s+/g, '').toLowerCase();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Sample data for development/testing
export const sampleEmployees = [
  {
    id: 'EMP-00123',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Production Manager',
    contact: '+1-202-555-0170',
    status: 'Active',
    avatar: generateAvatar('Jane Cooper')
  },
  {
    id: 'EMP-00124',
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'Assembly Worker',
    contact: '+1-202-555-0191',
    status: 'Active',
    avatar: generateAvatar('Cody Fisher')
  },
  {
    id: 'EMP-00125',
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Quality Control',
    contact: '+1-202-555-0127',
    status: 'On Leave',
    avatar: generateAvatar('Esther Howard')
  }
];

export const sampleAttendanceData = [
  {
    id: '39488846',
    name: 'Bagus Fikri',
    clockIn: '10:02 AM',
    clockOut: '07:00 PM',
    overtime: '2h 12m',
    status: 'Present',
    notes: 'Discussed mutual value proposition...',
    avatar: generateAvatar('Bagus Fikri')
  },
  {
    id: '34534543',
    name: 'Ihdzain',
    clockIn: '09:30 AM',
    clockOut: '07:12 PM',
    overtime: '-',
    status: 'Present',
    notes: 'Tynisha is already lined up for th...',
    avatar: generateAvatar('Ihdzain')
  },
  {
    id: '82747837',
    name: 'Mufli Hidayat',
    clockIn: '09:24 AM',
    clockOut: '05:00 PM',
    overtime: '-',
    status: 'Left for the day',
    notes: 'Marci is already doing some gre...',
    avatar: generateAvatar('Mufli Hidayat')
  },
  {
    id: '39488844',
    name: 'Fauzan Ardiansyah',
    clockIn: '08:56 AM',
    clockOut: '05:01 PM',
    overtime: '-',
    status: 'Absent',
    notes: 'Tynisha is already lined up for th...',
    avatar: generateAvatar('Fauzan Ardiansyah')
  },
  {
    id: '93884744',
    name: 'Raihan Fikri',
    clockIn: '08:56 AM',
    clockOut: '07:00 PM',
    overtime: '1h 05m',
    status: 'Present',
    notes: 'Discussed mutual value proposi...',
    avatar: generateAvatar('Raihan Fikri')
  }
];