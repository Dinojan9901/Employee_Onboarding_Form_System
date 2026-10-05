import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { personalDetailsSchema } from '../../utils/validationSchema';
import { fieldErrorProps } from '../../utils/fieldErrorProps';

const PersonalDetailsForm = ({ formData, updateFormData, nextStep, formErrors, setFormErrors }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
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

  // Next is always clickable: handleSubmit validates every field, shows all the
  // messages at once and focuses the first invalid field
  const onSubmit = (data) => {
    updateFormData(data);
    setFormErrors(prev => ({ ...prev, personalDetails: null }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName')}
          {...fieldErrorProps(errors, 'fullName')}
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.fullName && <p id="fullName-error" className="form-error">{errors.fullName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <DatePicker
              id="dateOfBirth"
              // react-datepicker exposes setFocus() rather than focus()
              ref={(picker) => field.ref(picker && { focus: () => picker.setFocus() })}
              selected={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ariaInvalid={String(Boolean(errors.dateOfBirth))}
              ariaDescribedBy={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
              className="form-input"
              placeholderText="Select your date of birth"
              maxDate={new Date()}
              showYearDropdown
              dateFormat="MM/dd/yyyy"
            />
          )}
        />
        {errors.dateOfBirth && <p id="dateOfBirth-error" className="form-error">{errors.dateOfBirth.message}</p>}
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
              {...fieldErrorProps(errors, 'gender')}
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
              {...fieldErrorProps(errors, 'gender')}
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
              {...fieldErrorProps(errors, 'gender')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="other" className="ml-2 text-gray-700">
              Other
            </label>
          </div>
        </div>
        {errors.gender && <p id="gender-error" className="form-error">{errors.gender.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          {...register('phoneNumber')}
          {...fieldErrorProps(errors, 'phoneNumber')}
          className="form-input"
          placeholder="Enter your 10-digit phone number"
        />
        {errors.phoneNumber && <p id="phoneNumber-error" className="form-error">{errors.phoneNumber.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          {...fieldErrorProps(errors, 'email')}
          className="form-input"
          placeholder="Enter your email address"
        />
        {errors.email && <p id="email-error" className="form-error">{errors.email.message}</p>}
      </div>

      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
