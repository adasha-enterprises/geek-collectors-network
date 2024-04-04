import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack, useToast } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from '../schemas/schemas';
import LoginControls from './LoginControls';

type LoginValues = {
  email: string;
  password: string;
};

async function login(values: LoginValues): Promise<boolean> {
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Error with Network Request');
    }

    const data = await response.json();
    if (data.isError) {
      console.error(data.data);
      return false;
    }
    return true;
  } catch (error) {
    console.log('Login failed: ', error);
    return false;
  }
}

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (values : LoginValues) => {
    setIsLoading(true);
    const success = await login(values);

    if (success) {
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <VStack gap={4}>
            <TextInput name="email" label="Email:" />
            <TextInput name="password" label="Password:" type="password" />

            <LoginControls />

            <Button
              isLoading={isLoading}
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
