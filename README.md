# Employee Onboarding Form System

A complete form-based React application for HR or team leads to onboard new employees by filling out their personal, professional, and account-related details.

## Features

### Multi-Step Form (3 Sections)

**Step 1 – Personal Details**
- Full Name
- Date of Birth (with DatePicker)
- Gender (Radio buttons)
- Phone Number (with validation)
- Email (with validation)

**Step 2 – Job Details**
- Department (Dropdown)
- Role
- Joining Date (Date Picker)
- Work Location

**Step 3 – Account Setup**
- Username
- Password (with validation)
- Upload Profile Picture
- Accept Terms and Conditions (Checkbox)

### Key Technical Features
- Controlled inputs using React Hook Form
- Field-level and step-level validation using Zod
- Navigation between form steps (Next/Previous buttons)
- File upload preview
- Submit button only enabled if all validations pass
- Form summary on submission
- Draft saved to localStorage and restored on reload (password and profile picture are never stored)
- Mock API for submission and username availability (no backend required)
- Responsive design using Tailwind CSS

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd employee-onboarding-form
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to http://localhost:3000

## Tech Stack

- **Frontend Framework**: React.js
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Date Picker**: React Datepicker
- **Storage**: Local Storage

## Project Structure

```
employee-onboarding-form/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── index.css               # Tailwind directives and shared form/button classes
│   ├── components/
│   │   ├── forms/
│   │   │   ├── PersonalDetailsForm.jsx # Step 1
│   │   │   ├── JobDetailsForm.jsx      # Step 2
│   │   │   ├── AccountSetupForm.jsx    # Step 3, with live username availability check
│   │   │   └── FormSummary.jsx         # Summary, JSON export and reset after submission
│   │   └── ui/
│   │       ├── Header.jsx
│   │       ├── FormStepIndicator.jsx   # Step circles (tablet and desktop)
│   │       ├── ProgressBar.jsx
│   │       └── PasswordStrengthMeter.jsx
│   ├── utils/
│   │   ├── validationSchema.js         # Zod schema for each step
│   │   ├── storage.js                  # localStorage draft save/restore
│   │   └── mockApi.js                  # Simulated submit and username check
│   ├── App.jsx                         # Step navigation and shared form state
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Deployment

This project can be easily deployed to platforms like Vercel or Netlify. Simply connect your GitHub repository to your Vercel/Netlify account and follow the deployment instructions.

## Future Enhancements

- Backend integration for data persistence
- Multi-language support
- Accessibility improvements
- Admin dashboard to view all employee submissions
- Document upload capability
- Email notifications
