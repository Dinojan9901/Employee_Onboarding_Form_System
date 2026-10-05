import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { jobDetailsSchema } from '../../utils/validationSchema';
import { fieldErrorProps } from '../../utils/fieldErrorProps';
import { departments } from '../../utils/departments';

const JobDetailsForm = ({ formData, updateFormData, nextStep, prevStep, formErrors, setFormErrors }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
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

  // Next is always clickable: handleSubmit validates every field, shows all the
  // messages at once and focuses the first invalid field
  const onSubmit = (data) => {
    updateFormData(data);
    setFormErrors(prev => ({ ...prev, jobDetails: null }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          id="department"
          {...register('department')}
          {...fieldErrorProps(errors, 'department')}
          className="form-input"
        >
          {departments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
        {errors.department && <p id="department-error" className="form-error">{errors.department.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <input
          type="text"
          id="role"
          {...register('role')}
          {...fieldErrorProps(errors, 'role')}
          className="form-input"
          placeholder="Enter job role/title"
        />
        {errors.role && <p id="role-error" className="form-error">{errors.role.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="joiningDate" className="form-label">Joining Date</label>
        <Controller
          name="joiningDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              id="joiningDate"
              // react-datepicker exposes setFocus() rather than focus()
              ref={(picker) => field.ref(picker && { focus: () => picker.setFocus() })}
              selected={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ariaInvalid={String(Boolean(errors.joiningDate))}
              ariaDescribedBy={errors.joiningDate ? 'joiningDate-error' : undefined}
              className="form-input"
              placeholderText="Select joining date"
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
            />
          )}
        />
        {errors.joiningDate && <p id="joiningDate-error" className="form-error">{errors.joiningDate.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="workLocation" className="form-label">
          Work Location
        </label>
        <input
          type="text"
          id="workLocation"
          {...register('workLocation')}
          {...fieldErrorProps(errors, 'workLocation')}
          className="form-input"
          placeholder="Enter work location"
        />
        {errors.workLocation && <p id="workLocation-error" className="form-error">{errors.workLocation.message}</p>}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="btn-secondary"
        >
          Previous
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default JobDetailsForm;
