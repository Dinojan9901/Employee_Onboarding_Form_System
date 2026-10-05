import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormSummary from './FormSummary';

const formData = {
  fullName: 'Jane Doe',
  dateOfBirth: new Date(1990, 0, 15),
  gender: 'other',
  phoneNumber: '0123456789',
  email: 'jane@example.com',
  department: 'hr',
  role: 'HR Analyst',
  joiningDate: new Date(2030, 0, 1),
  workLocation: 'Colombo',
  username: 'jdoe1',
  password: 'Secret#123',
  profilePicture: null,
  acceptTerms: true,
};

describe('FormSummary', () => {
  it('shows the department label rather than its stored value', () => {
    render(<FormSummary formData={formData} onReset={vi.fn()} />);
    expect(screen.getByText('Human Resources')).toBeInTheDocument();
  });


  it('leaves the password out of the exported JSON', async () => {
    // Capture the download link instead of letting jsdom try to navigate to it
    const hrefs = [];
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      hrefs.push(this.getAttribute('href'));
    });

    render(<FormSummary formData={formData} onReset={vi.fn()} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Export Data' }));
    click.mockRestore();

    expect(hrefs).toHaveLength(1);
    const exported = JSON.parse(decodeURIComponent(hrefs[0].slice(hrefs[0].indexOf(',') + 1)));
    expect(exported).not.toHaveProperty('password');
    expect(exported).toMatchObject({ fullName: 'Jane Doe', username: 'jdoe1', acceptTerms: true });
  });
});
