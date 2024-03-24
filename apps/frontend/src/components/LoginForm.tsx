import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from '../schemas/schemas';
import LoginControls from './LoginControls';

function login(navigate: (path: string) => void, values: Record<string, string>) {
  fetch('/api/v1/auth/login', {
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

      return navigate('/dashboard');
    });
}

function LoginForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={login.bind(null, navigate)}
    >
      {formik => (
        <Form>
          <VStack gap={4}>
            <TextInput name="email" label="Email:" />
            <TextInput name="password" label="Password:" type="password" />

            <LoginControls />

            <Button
              type="submit"
              w={'100%'}
              colorScheme="brand"
              variant="solid"
              disabled={formik.isSubmitting}>
                LOG IN
            </Button>

            <PageLink text={'Not registered? Sign up!'} to={'/register'}/>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
