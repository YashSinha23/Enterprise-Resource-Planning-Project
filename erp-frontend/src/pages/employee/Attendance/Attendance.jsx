import React, { useState } from 'react';
import AttendanceSummaryCards from './components/AttendanceSummaryCards';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceTable from './components/AttendanceTable';
import { sampleAttendanceData, calculateAttendanceSummary, filterAttendanceData } from './data/attendanceData';

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Filter attendance data
    const filteredAttendanceData = filterAttendanceData(sampleAttendanceData, searchTerm, statusFilter);

    // Calculate attendance summary
    const attendanceSummary = calculateAttendanceSummary(sampleAttendanceData);

    const handleRefresh = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Filters and Actions Bar */}
            <AttendanceFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                loading={loading}
                handleRefresh={handleRefresh}
            />

            {/* Attendance Summary Cards */}
            <AttendanceSummaryCards attendanceSummary={attendanceSummary} />


            {/* Employee Attendance List */}
            <AttendanceTable
                attendanceData={filteredAttendanceData}
                loading={loading}
                onRefresh={handleRefresh}
            />
        </div>
    );
};

export default Attendance;
