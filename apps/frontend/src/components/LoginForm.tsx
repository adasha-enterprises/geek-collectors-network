import React from 'react';
import { Form, Formik } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

import TextInput from './TextInput';
import PageLink from './PageLink';
import { loginSchema } from '../schemas/schemas';
import LoginControls from './LoginControls';

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={values => {
        console.log(values);
      }}
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
