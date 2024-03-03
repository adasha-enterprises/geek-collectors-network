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
