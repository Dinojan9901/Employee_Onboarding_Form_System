import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { jobDetailsSchema } from '../../utils/validationSchema';

const JobDetailsForm = ({ formData, updateFormData, nextStep, prevStep, formErrors, setFormErrors }) => {
  const [joiningDate, setJoiningDate] = useState(formData.joiningDate);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm({
    resolver: zodResolver(jobDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      department: formData.department || '',
      role: formData.role || '',
      workLocation: formData.workLocation || '',
      joiningDate: formData.joiningDate || null
    }
  });

  const onSubmit = (data) => {
    updateFormData({ ...data, joiningDate });
    setFormErrors(prev => ({ ...prev, jobDetails: null }));
    nextStep();
  };

  const handleDateChange = (date) => {
    setJoiningDate(date);
    setValue('joiningDate', date);
    trigger('joiningDate');
  };

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'operations', label: 'Operations' },
    { value: 'customer_support', label: 'Customer Support' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          id="department"
          {...register('department')}
          className="form-input"
        >
          {departments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
        {errors.department && <p className="form-error">{errors.department.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <input
          type="text"
          id="role"
          {...register('role')}
          className="form-input"
          placeholder="Enter job role/title"
        />
        {errors.role && <p className="form-error">{errors.role.message}</p>}
      </div>

      <div className="mb-4">
        <label className="form-label">Joining Date</label>
        <DatePicker
          selected={joiningDate}
          onChange={handleDateChange}
          className="form-input"
          placeholderText="Select joining date"
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
        />
        {errors.joiningDate && <p className="form-error">{errors.joiningDate.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="workLocation" className="form-label">
          Work Location
        </label>
        <input
          type="text"
          id="workLocation"
          {...register('workLocation')}
          className="form-input"
          placeholder="Enter work location"
        />
        {errors.workLocation && <p className="form-error">{errors.workLocation.message}</p>}
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
          className={isValid ? "btn-primary" : "btn-disabled"}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default JobDetailsForm;
