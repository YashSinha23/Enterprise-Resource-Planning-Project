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
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // If backend sends { success, data }, return that
    if (data && data.data) {
      return data.data;
    }

    return data; // Assume it's the created record
  } catch (err) {
    console.error("Error adding employee:", err);
    throw err;
  }
};
