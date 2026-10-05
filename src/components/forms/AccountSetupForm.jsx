import { useState, useRef, useEffect } from 'react';
import { checkUsernameAvailability } from '../../utils/mockApi';
import PasswordStrengthMeter from '../ui/PasswordStrengthMeter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSetupSchema } from '../../utils/validationSchema';

const AccountSetupForm = ({ formData, prevStep, handleSubmit, formErrors, setFormErrors }) => {
  const [profileImage, setProfileImage] = useState(formData.profilePicture);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const fileInputRef = useRef(null);
  
  const { 
    register, 
    handleSubmit: handleFormSubmit, 
    formState: { errors, isValid },
    watch
  } = useForm({
    resolver: zodResolver(accountSetupSchema),
    mode: 'onChange',
    defaultValues: {
      username: formData.username || '',
      password: formData.password || '',
      profilePicture: formData.profilePicture || null,
      acceptTerms: formData.acceptTerms || false
    }
  });

  const passwordValue = watch('password');
  const acceptTermsValue = watch('acceptTerms');
  const usernameValue = watch('username');
  
  // Check username availability when user stops typing
  useEffect(() => {
    // Forget the previous result straight away, so a name that was available can't
    // keep the submit button enabled while the new one is still being checked
    setUsernameAvailable(null);
    setCheckingUsername(false);

    if (!usernameValue || usernameValue.length < 4) {
      return;
    }

    // Set when the username changes again, so a slow response for an older value is ignored
    let cancelled = false;

    const timeoutId = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const result = await checkUsernameAvailability(usernameValue);
        if (!cancelled) setUsernameAvailable(result.available);
      } catch (error) {
        console.error('Error checking username:', error);
      } finally {
        if (!cancelled) setCheckingUsername(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [usernameValue]);

  const onSubmit = (data) => {
    setFormErrors(prev => ({ ...prev, accountSetup: null }));
    handleSubmit({ ...data, profilePicture: profileImage });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            {...register('username')}
            className={`form-input ${usernameAvailable === false ? 'border-red-500' : usernameAvailable === true ? 'border-green-500' : ''}`}
            placeholder="Choose a username"
          />
          {checkingUsername && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          {!checkingUsername && usernameAvailable === true && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {!checkingUsername && usernameAvailable === false && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {errors.username && <p className="form-error">{errors.username.message}</p>}
        {!errors.username && usernameAvailable === false && (
          <p className="form-error">This username is already taken.</p>
        )}
        {!errors.username && usernameAvailable === true && (
          <p className="text-sm text-green-600">Username is available!</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="form-input"
          placeholder="Create a password"
        />
        {errors.password && <p className="form-error">{errors.password.message}</p>}
        
        {passwordValue && <PasswordStrengthMeter password={passwordValue} />}
        
        {passwordValue && (
          <div className="mt-2">
            <p className="text-sm">Password must:</p>
            <ul className="text-sm list-disc pl-5">
              <li className={passwordValue.length >= 8 ? "text-green-600" : "text-gray-500"}>
                Be at least 8 characters long
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? "text-green-600" : "text-gray-500"}>
                Contain at least one special character
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label">Profile Picture</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <div className="mt-1 flex items-center">
          <div className="relative">
            <div className="h-28 w-28 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="ml-4 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Image
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700">
              I accept the Terms and Conditions
            </label>
            <p className="text-gray-500">
              By selecting this, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        {errors.acceptTerms && <p className="form-error">{errors.acceptTerms.message}</p>}
      </div>

      <div className="mt-6 flex justify-between">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn-secondary"
        >
          Previous
        </button>
        <button 
          type="submit" 
          className={isValid && acceptTermsValue && usernameAvailable === true ? "btn-primary" : "btn-disabled"}
          disabled={!isValid || !acceptTermsValue || usernameAvailable !== true}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AccountSetupForm;
