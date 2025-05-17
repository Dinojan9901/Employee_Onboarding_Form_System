import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="px-6 pt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <div className={`${currentStep >= 0 ? 'text-blue-600 font-medium' : ''}`}>
          Personal Details
        </div>
        <div className={`${currentStep >= 1 ? 'text-blue-600 font-medium' : ''}`}>
          Job Details
        </div>
        <div className={`${currentStep >= 2 ? 'text-blue-600 font-medium' : ''}`}>
          Account Setup
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
