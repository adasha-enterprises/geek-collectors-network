import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Button,
  HStack,
  Checkbox,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageLink from './PageLink';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less.')
    .required('Please enter your first name.'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less.')
    .required('Please enter your last name.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter your email.'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters.')
    .required('Please enter your password.'),
});

function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack gap={4}>
        <FormControl
          id="firstName"
          isInvalid={!!(formik.errors.firstName && formik.touched.firstName)}
        >
          <FormLabel>First name:</FormLabel>
          <Input
            type="text"
            focusBorderColor="brand.600"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="lastName"
          isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}
        >
          <FormLabel>Last name:</FormLabel>
          <Input
            type="text"
            focusBorderColor="brand.600"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="email"
          isInvalid={!!(formik.errors.email && formik.touched.email)}
        >
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            focusBorderColor="brand.600"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isInvalid={!!(formik.errors.password && formik.touched.password)}
        >
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            focusBorderColor="brand.600"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormHelperText>Must be at least 8 characters.</FormHelperText>
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
          mt={8}
          m={5}
          disabled={formik.isSubmitting}
        >
          SIGN UP
        </Button>
        <PageLink text={'Already have an account? Log in!'} to={'/login'} paddingBottom={20} />
      </VStack>
    </form>
  );
}

export default RegistrationForm;
