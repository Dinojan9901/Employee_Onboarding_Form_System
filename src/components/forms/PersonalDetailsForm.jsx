import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { personalDetailsSchema } from '../../utils/validationSchema';

const PersonalDetailsForm = ({ formData, updateFormData, nextStep, formErrors, setFormErrors }) => {
  const [dob, setDob] = useState(formData.dateOfBirth);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(personalDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: formData.fullName || '',
      gender: formData.gender || '',
      phoneNumber: formData.phoneNumber || '',
      email: formData.email || '',
      dateOfBirth: formData.dateOfBirth || null
    }
  });

  const onSubmit = (data) => {
    updateFormData({ ...data, dateOfBirth: dob });
    setFormErrors(prev => ({ ...prev, personalDetails: null }));
    nextStep();
  };

  const handleDateChange = (date) => {
    setDob(date);
    setValue('dateOfBirth', date);
    trigger('dateOfBirth');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName')}
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="form-label">Date of Birth</label>
        <DatePicker
          selected={dob}
          onChange={handleDateChange}
          className="form-input"
          placeholderText="Select your date of birth"
          maxDate={new Date()}
          showYearDropdown
          dateFormat="MM/dd/yyyy"
        />
        {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth.message}</p>}
      </div>

      <div className="mb-4">
        <label className="form-label">Gender</label>
        <div className="flex space-x-4 mt-1">
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="male" className="ml-2 text-gray-700">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="female" className="ml-2 text-gray-700">
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="other"
              value="other"
              {...register('gender')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="other" className="ml-2 text-gray-700">
              Other
            </label>
          </div>
        </div>
        {errors.gender && <p className="form-error">{errors.gender.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          {...register('phoneNumber')}
          className="form-input"
          placeholder="Enter your 10-digit phone number"
        />
        {errors.phoneNumber && <p className="form-error">{errors.phoneNumber.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="form-input"
          placeholder="Enter your email address"
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          type="submit" 
          className={isValid ? "btn-primary" : "btn-disabled"}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
