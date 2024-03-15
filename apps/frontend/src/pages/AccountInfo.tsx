import React from 'react';
import { VStack, StackDivider, Button, FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { registrationSchema } from '../schemas/schemas';
import PageLayout from '../components/PageLayout';
import PageTitle from '../components/PageTitle';


function AccountInfo() {
//   const accountInfo = () => {
//     const response = await fetch('http://localhost:3001/accountInfo', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//   };

  const accountInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@email.com',
    password: 'password',
  };


  return (
    <PageLayout showNavigation={true}>
      <VStack
        bg={'background'}
        // divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        px={10}
        pt={20}
      >
        <PageTitle title={'Account Info'} />
        <Formik
          initialValues={{
            firstName: accountInfo.firstName,
            lastName: accountInfo.lastName,
            email: accountInfo.email,
            password: accountInfo.password,
          }}
          validationSchema={registrationSchema}
          onSubmit={values => {
            console.log(values);
          }}
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
