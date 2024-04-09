import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Button, FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { registrationSchema } from '../../schemas/schemas';
import PageLayout from '../../components/PageLayout';
import loadingAnimation from '../../components/widgets/LoadingAnimation';

type AccountInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function editProfile(values: Record<string, string>) {
  fetch('/api/v1/user/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    }),
  })
    .then(response => response.json())
    .then(console.log);
}

function AccountInfo() {
  const [initialValues, setInitialValues] = useState<AccountInfo | null>(null);

  useEffect(() => {
    fetch('/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => setInitialValues(data))
      .catch(error => console.error(error));
  }, []);

  if (!initialValues) {
    return (
      <PageLayout>
        {loadingAnimation}
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={editProfile}
      >
        {formik => (
          <Form className="account-form">
            <VStack gap={1} divider={<StackDivider/>} >
              <FormControl id={'firstName'} isInvalid={!!(formik.errors.firstName && formik.touched.firstName)}>
                <FormLabel>First Name</FormLabel>
                <Field as={Input} name={'firstName'} isInvalid={false}></Field>
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl id={'lastName'} isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}>
                <FormLabel>Last Name</FormLabel>
                <Field as={Input} name={'lastName'} isInvalid={false} ></Field>
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl id={'email'} isInvalid={!!(formik.errors.email && formik.touched.email)}>
                <FormLabel>Email</FormLabel>
                <Field as={Input} name={'email'} isInvalid={false} ></Field>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id={'password'} isInvalid={!!(formik.errors.password && formik.touched.password)}>
                <FormLabel>Password</FormLabel>
                <Field as={Input} name={'password'} isInvalid={false} ></Field>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                className="submit-button"
                type="submit"
                colorScheme="brand"
                variant="outline"
                _hover={{
                  backgroundColor: 'brand.500',
                  border: '1px solid transparent',
                  color: 'white',
                }}
                disabled={!formik.dirty || formik.isSubmitting}>
                                SAVE
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
}

export default AccountInfo;
