import React from 'react';

const FormStepIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="hidden md:flex items-center justify-between px-6 py-4 border-b">
      {stepTitles.map((title, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-full 
            ${index < currentStep 
              ? 'bg-green-500 text-white' 
              : index === currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'}
            transition-all duration-200
          `}>
            {index < currentStep ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          
          <div className={`ml-3 ${
            index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
          }`}>
            {title}
          </div>
          
          {index < stepTitles.length - 1 && (
            <div className="hidden lg:block flex-grow mx-4 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ 
                  width: index < currentStep ? '100%' : index === currentStep ? '50%' : '0%' 
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormStepIndicator;
