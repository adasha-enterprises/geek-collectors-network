import * as Yup from 'yup';

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .required('Please enter your first name.'),

  lastName: Yup.string()
    .required('Please enter your last name.'),

  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your account email.'),

  password: Yup.string()
    .min(8, 'Must be at least 8 characters.')
    .required('Please enter your password.'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your account email.'),

  password: Yup.string()
    .required('Please enter your password.'),
});

export const profileSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your username.'),

  birthDate: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format (MM/DD/YYYY)')
    .required('Please enter your date of birth.'),

  city: Yup.string()
    .required('Please enter your city.'),

  about: Yup.string()
    .max(1000, 'Please keep your bio under 1000 characters.')
    .required('Please enter a short bio.'),
});
