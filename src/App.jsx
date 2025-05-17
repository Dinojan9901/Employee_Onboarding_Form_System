import { useState, useEffect } from 'react';
import { saveFormData, getFormData, clearFormData } from './utils/storage';
import { submitEmployeeData } from './utils/mockApi';
import PersonalDetailsForm from './components/forms/PersonalDetailsForm';
import JobDetailsForm from './components/forms/JobDetailsForm';
import AccountSetupForm from './components/forms/AccountSetupForm';
import FormSummary from './components/forms/FormSummary';
import ProgressBar from './components/ui/ProgressBar';
import Header from './components/ui/Header';
import FormStepIndicator from './components/ui/FormStepIndicator';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    // Try to get saved form data from localStorage on initial load
    const savedData = getFormData();
    if (savedData) {
      // Convert date strings back to Date objects
      if (savedData.dateOfBirth) savedData.dateOfBirth = new Date(savedData.dateOfBirth);
      if (savedData.joiningDate) savedData.joiningDate = new Date(savedData.joiningDate);
      return savedData;
    }
    
    // Default initial form data
    return {
      // Personal Details
      fullName: '',
      dateOfBirth: null,
      gender: '',
      phoneNumber: '',
      email: '',
      
      // Job Details
      department: '',
      role: '',
      joiningDate: null,
      workLocation: '',
      
      // Account Setup
      username: '',
      password: '',
      profilePicture: null,
      acceptTerms: false
    };
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const updateFormData = (stepData) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    // Save to localStorage whenever form data is updated
    saveFormData(updatedData);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    // Save to localStorage first as a backup
    saveFormData(formData);
    
    // Reset states
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);
    
    try {
      // Call mock API service to simulate form submission
      const response = await submitEmployeeData(formData);
      
      if (response.success) {
        setSubmitSuccess(response.message);
        setIsSubmitted(true);
      } else {
        setSubmitError(response.error || 'An error occurred during submission');
      }
    } catch (error) {
      setSubmitError(error.message || 'An unexpected error occurred');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    clearFormData();
    setFormData({
      fullName: '',
      dateOfBirth: null,
      gender: '',
      phoneNumber: '',
      email: '',
      department: '',
      role: '',
      joiningDate: null,
      workLocation: '',
      username: '',
      password: '',
      profilePicture: null,
      acceptTerms: false
    });
    setCurrentStep(0);
    setIsSubmitted(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const steps = [
    {
      title: 'Personal Details',
      component: <PersonalDetailsForm 
                   formData={formData} 
                   updateFormData={updateFormData} 
                   nextStep={nextStep}
                   formErrors={formErrors}
                   setFormErrors={setFormErrors}
                 />
    },
    {
      title: 'Job Details',
      component: <JobDetailsForm 
                   formData={formData} 
                   updateFormData={updateFormData} 
                   nextStep={nextStep} 
                   prevStep={prevStep}
                   formErrors={formErrors}
                   setFormErrors={setFormErrors}
                 />
    },
    {
      title: 'Account Setup',
      component: <AccountSetupForm 
                   formData={formData} 
                   updateFormData={updateFormData} 
                   prevStep={prevStep} 
                   handleSubmit={handleSubmit}
                   formErrors={formErrors}
                   setFormErrors={setFormErrors}
                 />
    },
  ];

  // Extract step titles for the FormStepIndicator
  const stepTitles = steps.map(step => step.title);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-6 md:my-10">
        <Header />
        
        {submitError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p><strong>Error:</strong> {submitError}</p>
            </div>
            <button 
              className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
              onClick={() => setSubmitError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        {!isSubmitted ? (
          <>
            <FormStepIndicator 
              currentStep={currentStep} 
              totalSteps={steps.length} 
              stepTitles={stepTitles} 
            />
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">{steps[currentStep].title}</h2>
              
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Submitting your information...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              ) : (
                steps[currentStep].component
              )}
            </div>
          </>
        ) : (
          <FormSummary formData={formData} onReset={resetForm} />
        )}
      </div>
    </div>
  );
}

export default App;
