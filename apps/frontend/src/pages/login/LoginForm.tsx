import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, VStack, useToast } from '@chakra-ui/react';

import TextInput from '../../components/TextInput';
import PageLink from '../../components/PageLink';
import { loginSchema } from '../../schemas/schemas';

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
        duration: 2000,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        status: 'error',
        duration: 2000,
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
        <Form className="login-form">
          <VStack gap={4}>
            <TextInput name="email" label="Email" />
            <TextInput name="password" label="Password" type="password" />

            <Button
              className="login-button"
              isLoading={isLoading}
              type="submit"
              variant="outline"
              colorScheme="brand"
              _hover={{
                backgroundColor: 'brand.500',
                border: '1px solid transparent',
                color: 'white',
              }}
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
