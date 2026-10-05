import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonalDetailsForm from './PersonalDetailsForm';

const emptyDetails = { fullName: '', dateOfBirth: null, gender: '', phoneNumber: '', email: '' };

const renderForm = (formData) => {
  const props = {
    formData,
    updateFormData: vi.fn(),
    nextStep: vi.fn(),
    formErrors: {},
    setFormErrors: vi.fn(),
  };
  render(<PersonalDetailsForm {...props} />);
  return props;
};

describe('PersonalDetailsForm', () => {
  it('clicking Next with an empty date shows "Date of birth is required"', async () => {
    const user = userEvent.setup();
    const { nextStep } = renderForm(emptyDetails);

    await user.type(screen.getByLabelText('Full Name'), 'Jane Doe');
    await user.click(screen.getByLabelText('Other'));
    await user.type(screen.getByLabelText('Phone Number'), '0123456789');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('Date of birth is required')).toBeInTheDocument();
    const dateInput = screen.getByLabelText('Date of Birth');
    await waitFor(() => expect(dateInput).toHaveFocus());
    expect(dateInput).toHaveAttribute('aria-invalid', 'true');
    expect(dateInput).toHaveAccessibleDescription('Date of birth is required');
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('clicking Next on an empty form shows every missing field and focuses the first', async () => {
    const user = userEvent.setup();
    renderForm(emptyDetails);

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Date of birth is required')).toBeInTheDocument();
    expect(screen.getByText('Gender selection is required')).toBeInTheDocument();
    expect(screen.getByText('Phone number must be 10 digits')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText('Full Name')).toHaveFocus());
  });

  it('moves on once every field, including the date, is filled', async () => {
    const user = userEvent.setup();
    const dateOfBirth = new Date(1990, 0, 15);
    const { updateFormData, nextStep } = renderForm({
      fullName: 'Jane Doe',
      dateOfBirth,
      gender: 'other',
      phoneNumber: '0123456789',
      email: 'jane@example.com',
    });

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(nextStep).toHaveBeenCalledTimes(1));
    expect(updateFormData).toHaveBeenCalledWith(expect.objectContaining({ fullName: 'Jane Doe', dateOfBirth }));
  });
});
