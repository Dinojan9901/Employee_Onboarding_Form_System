import { z } from 'zod';

// Personal Details Schema
export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.instanceof(Date, { message: "Date of birth is required" }),
  gender: z.string().min(1, "Gender selection is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

// Job Details Schema
export const jobDetailsSchema = z.object({
  department: z.string().min(1, "Department selection is required"),
  role: z.string().min(2, "Role is required"),
  joiningDate: z.instanceof(Date, { message: "Joining date is required" }),
  workLocation: z.string().min(2, "Work location is required"),
});

// Account Setup Schema
export const accountSetupSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  profilePicture: z.any().nullable(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});
