import { describe, it, expect } from 'vitest';
import { personalDetailsSchema, jobDetailsSchema } from './validationSchema';

const personalDetails = {
  fullName: 'Jane Doe',
  dateOfBirth: new Date(1990, 0, 15),
  gender: 'other',
  phoneNumber: '0123456789',
  email: 'jane@example.com',
};

const jobDetails = {
  department: 'hr',
  role: 'HR Analyst',
  joiningDate: new Date(2030, 0, 1),
  workLocation: 'Colombo',
};

describe('email', () => {
  it('says the email is required when empty, and invalid when malformed', () => {
    const empty = personalDetailsSchema.safeParse({ ...personalDetails, email: '' });
    expect(empty.error.issues[0].message).toBe('Email is required');

    const malformed = personalDetailsSchema.safeParse({ ...personalDetails, email: 'jane@' });
    expect(malformed.error.issues[0].message).toBe('Invalid email format');
  });
});

describe('date fields', () => {
  it('accepts a selected date', () => {
    expect(personalDetailsSchema.safeParse(personalDetails).success).toBe(true);
    expect(jobDetailsSchema.safeParse(jobDetails).success).toBe(true);
  });

  it('rejects an empty date of birth', () => {
    const result = personalDetailsSchema.safeParse({ ...personalDetails, dateOfBirth: null });
    expect(result.success).toBe(false);
    expect(result.error.issues[0]).toMatchObject({
      path: ['dateOfBirth'],
      message: 'Date of birth is required',
    });
  });

  it('rejects an empty joining date', () => {
    const result = jobDetailsSchema.safeParse({ ...jobDetails, joiningDate: null });
    expect(result.success).toBe(false);
    expect(result.error.issues[0]).toMatchObject({
      path: ['joiningDate'],
      message: 'Joining date is required',
    });
  });
});
