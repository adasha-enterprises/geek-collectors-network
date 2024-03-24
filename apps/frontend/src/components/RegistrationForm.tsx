import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';
import TextInput from './TextInput';
import PageLink from './PageLink';
import { registrationSchema } from '../schemas/schemas';

function signUp(navigate: (path: string) => void, values: Record<string, string>) {
  fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(response => response.json())
    .then(response => {
      const { data, isError } = response;

      if (isError) return console.error(data);

      return navigate('/login');
    });
}

function RegistrationForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={registrationSchema}
      onSubmit={signUp.bind(null, navigate)}
    >
      {formik => (
        <Form>
          <VStack gap={4} >
            <TextInput name="firstName" label="First name:" />
            <TextInput name="lastName" label="Last name:" />
            <TextInput name="email" label="Email:" type="email" />
            <TextInput name="password" label="Password:" type="password" />

            <Button
              type="submit"
              w={'100%'}
              colorScheme="brand"
              variant="solid"
              disabled={formik.isSubmitting}>
                SIGN UP
            </Button>

            <PageLink text={'Already have an account? Log in!'} to={'/login'}/>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
