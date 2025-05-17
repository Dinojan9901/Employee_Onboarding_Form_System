/**
 * Mock API service to simulate backend interactions
 */

// Simulated network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulate submitting employee data to a server
 * @param {Object} employeeData - The employee data to submit
 * @returns {Promise} A promise that resolves with a response
 */
export const submitEmployeeData = async (employeeData) => {
  try {
    // Simulate network request delay
    await delay(1500);
    
    // Simulate 95% success rate
    if (Math.random() > 0.05) {
      return {
        success: true,
        data: {
          id: generateId(),
          ...employeeData,
          createdAt: new Date().toISOString()
        },
        message: 'Employee data submitted successfully!'
      };
    } else {
      // Simulate server error
      throw new Error('Server error occurred');
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to submit employee data'
    };
  }
};

/**
 * Simulate checking if a username is available
 * @param {string} username - The username to check
 * @returns {Promise} A promise that resolves with availability status
 */
export const checkUsernameAvailability = async (username) => {
  // Simulate network delay
  await delay(800);
  
  // These usernames are considered "taken" for demo purposes
  const takenUsernames = ['admin', 'user', 'test', 'hr', 'employee', 'manager'];
  
  return {
    available: !takenUsernames.includes(username.toLowerCase()),
    username
  };
};

/**
 * Generate a random ID for the employee record
 * @returns {string} A random ID string
 */
const generateId = () => {
  return 'EMP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};
