import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { submitEmployeeData } from './utils/mockApi';

vi.mock('./utils/mockApi', () => ({
  submitEmployeeData: vi.fn(async (data) => ({ success: true, message: 'Submitted', data })),
  checkUsernameAvailability: vi.fn(async (username) => ({ available: true, username })),
}));

// Steps 1 and 2 are restored from a saved draft, so the test doesn't have to drive the date pickers
const savedDraft = {
  fullName: 'Jane Doe',
  dateOfBirth: '1990-01-15T00:00:00.000Z',
  gender: 'other',
  phoneNumber: '0123456789',
  email: 'jane@example.com',
  department: 'hr',
  role: 'HR Analyst',
  joiningDate: '2030-01-01T00:00:00.000Z',
  workLocation: 'Colombo',
  username: '',
  password: '',
  profilePicture: null,
  acceptTerms: false,
};

describe('App submission', () => {
  it('sends the account setup fields to the API along with the earlier steps', async () => {
    localStorage.setItem('employeeOnboardingData', JSON.stringify(savedDraft));
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await screen.findByLabelText('Department');
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await user.type(await screen.findByLabelText('Username'), 'jdoe1');
    await user.type(screen.getByLabelText('Password'), 'Secret#123');
    await user.click(screen.getByLabelText('I accept the Terms and Conditions'));

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(submitEmployeeData).toHaveBeenCalledTimes(1));
    expect(submitEmployeeData.mock.calls[0][0]).toMatchObject({
      fullName: 'Jane Doe',
      department: 'hr',
      username: 'jdoe1',
      password: 'Secret#123',
      acceptTerms: true,
    });
    expect(await screen.findByText('Onboarding Complete!')).toBeInTheDocument();
  });
});
