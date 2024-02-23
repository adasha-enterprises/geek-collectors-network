import React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageLink from './PageLink';

/* Initialize a new Yup schema object. Defines a specific
object shape. They KEYS correspond to a field name, such
as "email", that you want to validate or transform; they
VALUE are the methods that actually validate or transform
that data. VALUE methods can be chained together. */
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your account email.'),
  password: Yup.string()
    .required('Please enter your password.'),
});

function LoginForm() {
  const formik = useFormik({
    /* These are the initial state of the form fields -- the
    state the user sees when they navigate to this page. */
    initialValues: {
      email: '',
      password: '',
    },
    /* This is the validation schema that the form will use
    to validate the form fields. */
    validationSchema: loginValidationSchema,

    /* If validation schema passes, the
    values will be submitted. */
    onSubmit: validatedValues => {
      console.log(validatedValues);
    },
  });

  return (

    /* The `onSubmit` prop is given the `handleSubmit(),
    a formik function that handles form submission. This
    automatically triggers validation, defined in the
    `validationSchema`; if validation passes, the form
    and its entered data are submitted. */
    <form onSubmit={formik.handleSubmit}>
      <VStack gap={4}>

        {/* Email Section */}
        <FormControl
          id="email"

          /* This is a boolean that determines if the form
          field is invalid. If it is, the form field will
          be highlighted red. */
          isInvalid={!!(formik.errors.email && formik.touched.email)}>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            focusBorderColor="brand.600"

            /* `formik.values.email` actually references initialValues.email,
            defined above in `const formik = useFormik(). This stores the
            current state of the form field. */
            value={formik.values.email}

            /* `formik.handleChange` listens to any changes to `value` and
            updates it's respective value; for this to work, the key in
            `initialValues` MUST be the same as the `FormControl` id. */
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* Password Section */}
        <FormControl
          id="password"
          isInvalid={!!(formik.errors.password && formik.touched.password)}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            focusBorderColor="brand.600"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <HStack w={'100%'} justify={'space-around'}>
          <Checkbox size={['sm', 'md']}>Remember me</Checkbox>
          <Button
            size={['sm', 'md']}
            colorScheme="brand"
            variant="link"
          >
            Forgot password?
          </Button>
        </HStack>
        <Button
          type="submit"
          w={'100%'}
          colorScheme="brand"
          variant="solid"
          disabled={formik.isSubmitting}
        >
          LOG IN
        </Button>
        <PageLink text={"Don't have an account? Sign up!"} to={'/register'}></PageLink>
      </VStack>
    </form>
  );
}

export default LoginForm;
