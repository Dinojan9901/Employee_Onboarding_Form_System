import React, { useState } from 'react';

const FormSummary = ({ formData, onReset }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formatDate = (date) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-center mb-8">
        <div className="rounded-full bg-green-100 p-3">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Onboarding Complete!</h2>
      <p className="text-center text-gray-600 mb-8">
        Thank you for completing the employee onboarding form. Here's a summary of the information you provided:
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Personal Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{formData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{formatDate(formData.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">{formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{formData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{formData.email}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Job Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{formData.department ? formData.department.charAt(0).toUpperCase() + formData.department.slice(1).replace('_', ' ') : "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{formData.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="font-medium">{formatDate(formData.joiningDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Work Location</p>
            <p className="font-medium">{formData.workLocation}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Account Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{formData.username}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Profile Picture</p>
            <div className="mt-1">
              {formData.profilePicture ? (
                <img 
                  src={formData.profilePicture} 
                  alt="Profile" 
                  className="h-20 w-20 rounded-full object-cover border border-gray-200" 
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          The data has been saved successfully. You can start a new form or export the data.
        </p>
        
        {!showConfirmation ? (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => setShowConfirmation(true)}
              className="btn-primary"
            >
              Start New Form
            </button>
            
            <button 
              onClick={() => {
                // Generate a JSON file for download, leaving out the password so it
                // never ends up in a plain-text file
                const { password, ...exportData } = formData;
                const dataStr = JSON.stringify(exportData, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                
                const exportFileDefaultName = 'employee-data.json';
                
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              className="btn-secondary"
            >
              Export Data
            </button>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Are you sure you want to start a new form?</h3>
            <p className="text-xs text-yellow-700 mb-4">This will clear all the current data.</p>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={onReset}
                className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                Yes, start new
              </button>
              
              <button 
                onClick={() => setShowConfirmation(false)}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSummary;
