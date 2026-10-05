import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountSetupForm from './AccountSetupForm';
import { checkUsernameAvailability } from '../../utils/mockApi';

vi.mock('../../utils/mockApi', () => ({
  checkUsernameAvailability: vi.fn(async (username) => ({ available: username !== 'admin', username })),
}));

const renderForm = () => {
  const props = {
    formData: { username: '', password: '', profilePicture: null, acceptTerms: false },
    prevStep: vi.fn(),
    handleSubmit: vi.fn(),
    formErrors: {},
    setFormErrors: vi.fn(),
  };
  render(<AccountSetupForm {...props} />);
  return props;
};

// Fills the form and clicks Submit straight away, before the debounced live check has run
const fillAndSubmit = async (user, username) => {
  await user.type(screen.getByLabelText('Username'), username);
  await user.type(screen.getByLabelText('Password'), 'Secret#123');
  await user.click(screen.getByLabelText('I accept the Terms and Conditions'));
  await user.click(screen.getByRole('button', { name: 'Submit' }));
};

describe('AccountSetupForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('clicking Submit with step 3 empty shows every missing field and focuses the first', async () => {
    const user = userEvent.setup();
    const { handleSubmit } = renderForm();

    const submit = screen.getByRole('button', { name: 'Submit' });
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(await screen.findByText('Username must be at least 4 characters')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText('Username')).toHaveFocus());
    expect(screen.getByLabelText('Password')).toHaveAccessibleDescription('Password must be at least 8 characters');
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('waits for the username check and flags a taken name on the field', async () => {
    const user = userEvent.setup();
    const { handleSubmit } = renderForm();

    await fillAndSubmit(user, 'admin');

    expect(await screen.findByText('This username is already taken.')).toBeInTheDocument();
    const username = screen.getByLabelText('Username');
    await waitFor(() => expect(username).toHaveFocus());
    expect(username).toHaveAttribute('aria-invalid', 'true');
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits once the username is confirmed available', async () => {
    const user = userEvent.setup();
    const { handleSubmit } = renderForm();

    await fillAndSubmit(user, 'jdoe1');

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ username: 'jdoe1', password: 'Secret#123', acceptTerms: true })
    );
  });

  it('reuses the running username check when Submit is clicked mid-check', async () => {
    const user = userEvent.setup();
    const { handleSubmit } = renderForm();

    // Hold the live check open so Submit is clicked while it is still running
    let resolveCheck;
    checkUsernameAvailability.mockImplementationOnce(
      (username) => new Promise((resolve) => { resolveCheck = () => resolve({ available: true, username }); })
    );

    await user.type(screen.getByLabelText('Username'), 'jdoe1');
    await user.type(screen.getByLabelText('Password'), 'Secret#123');
    await user.click(screen.getByLabelText('I accept the Terms and Conditions'));
    await waitFor(() => expect(checkUsernameAvailability).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText('Checking username…')).toBeInTheDocument();

    resolveCheck();
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(checkUsernameAvailability).toHaveBeenCalledTimes(1);
  });
});
