import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Button, FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { registrationSchema } from '../schemas/schemas';
import PageLayout from '../components/PageLayout';

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
      <PageLayout showNavigation={true}>
        <VStack
          bg={'background'}
          // divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          px={10}
          pt={20}
        >
          <div>Loading...</div>
        </VStack>
      </PageLayout>
    );
  }

  return (
    <PageLayout showNavigation={true}>
      <VStack
        bg={'background'}
        // divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        px={10}
        pt={20}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={editProfile}
        >
          {formik => (
            <Form style={{ width: '100%' }}>
              <VStack gap={1} divider={<StackDivider/>} >
                <FormControl id={'firstName'} isInvalid={!!(formik.errors.firstName && formik.touched.firstName)}>
                  <FormLabel color={'gray.500'}>First Name:</FormLabel>
                  <Field as={Input} name={'firstName'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl id={'lastName'} isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}>
                  <FormLabel color={'gray.500'}>Last Name:</FormLabel>
                  <Field as={Input} name={'lastName'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl id={'email'} isInvalid={!!(formik.errors.email && formik.touched.email)}>
                  <FormLabel color={'gray.500'}>Email:</FormLabel>
                  <Field as={Input} name={'email'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id={'password'} isInvalid={!!(formik.errors.password && formik.touched.password)}>
                  <FormLabel color={'gray.500'}>Password:</FormLabel>
                  <Field as={Input} name={'password'} border={'none'} focusBorderColor={'transparent'}></Field>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  mt={4}
                  w={'100%'}
                  colorScheme="brand"
                  variant="solid"
                  disabled={!formik.dirty || formik.isSubmitting}>
                                SAVE
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>

      </VStack>

    </PageLayout>
  );
}

export default AccountInfo;
