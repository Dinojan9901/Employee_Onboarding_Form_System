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
- Data saved to localStorage
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
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── index.css
│   ├── components/
│   │   ├── forms/
│   │   │   ├── PersonalDetailsForm.jsx
│   │   │   ├── JobDetailsForm.jsx
│   │   │   ├── AccountSetupForm.jsx
│   │   │   └── FormSummary.jsx
│   │   └── ui/
│   │       └── ProgressBar.jsx
│   ├── utils/
│   │   └── validationSchema.js
│   ├── App.jsx
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
