// src/api/employee.api.js
const API_URL = "http://localhost:5000/api/employees";

/**
 * Fetch all employees from the backend
 * @returns {Promise<Array>} Array of employee objects
 */
export const fetchEmployees = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // If backend sends { success, data }, use that, else assume array
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn("Unexpected response format from fetchEmployees:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching employees:", err);
    return [];
  }
};

/**
 * Add a new employee
 * @param {Object} employeeData Employee details to add
 * @returns {Promise<Object>} The newly created employee record
 */
export const addEmployee = async (employeeData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw error with the message from backend
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data.data || data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Get single employee by emp_code
export const getEmployee = async (empCode) => {
  try {
    const response = await fetch(`${API_URL}/${empCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch employee: ${response.statusText}`);
    }

    const data = await response.json();
    
    // If backend sends { success, data }, use data property, else assume it's the employee object
    if (data && data.data) {
      return data.data;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

// Update existing employee
export const updateEmployee = async (empCode, employeeData) => {
  try {
    const response = await fetch(`${API_URL}/${empCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }

    const data = await response.json();
    
    // If backend sends { success, data }, use data property, else assume it's the employee object
    if (data && data.data) {
      return data.data;
    }
    
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};
