/**
 * Utility functions for managing form data in local storage
 */

const STORAGE_KEY = 'employeeOnboardingData';

/**
 * Save form data to local storage
 * @param {Object} data - The form data to save
 */
export const saveFormData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
    return false;
  }
};

/**
 * Retrieve form data from local storage
 * @returns {Object|null} The stored form data or null if not found
 */
export const getFormData = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error retrieving form data from localStorage:', error);
    return null;
  }
};

/**
 * Clear stored form data from local storage
 */
export const clearFormData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing form data from localStorage:', error);
    return false;
  }
};
