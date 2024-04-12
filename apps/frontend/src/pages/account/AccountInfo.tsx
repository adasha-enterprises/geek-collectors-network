import React, { useEffect, useState } from 'react';
import { VStack, StackDivider, Button, FormControl, FormLabel, FormErrorMessage, Input, useToast } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { updateProfileSchema } from '../../schemas/schemas';
import PageLayout from '../../components/PageLayout';
import loadingAnimation from '../../components/widgets/LoadingAnimation';

type AccountInfoProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

async function editProfile(values: Record<string, string>): Promise<boolean> {
  try {
    const response = await fetch('/api/v1/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      }),
    });


    const data = await response.json();
    if (!response.ok || data.isError) {
      throw new Error(data.message || 'Failed to update profile due to network request error.');
    }
    return true;
  } catch (error) {
    console.log('Profile update failed: ', error);
    return false;
  }
}

function AccountInfo() {
  const [initialValues, setInitialValues] = useState<AccountInfoProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleEditProfile = async (values: AccountInfoProps) => {
    setIsLoading(true);
    const success = await editProfile(values);
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Profile successfully updated!',
        status: 'success',
        duration: 2000,
      });
    } else {
      toast({
        title: 'Profile update failed.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // When component mounts, immediately fetch user data for display
  useEffect(() => {
    fetch('/api/v1/user/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
        validationSchema={updateProfileSchema}
        onSubmit={handleEditProfile}
      >
        {formik => (
          <Form className="account-form">
            <VStack gap={1} divider={<StackDivider/>} >
              <FormControl id={'firstName'} isInvalid={!!(formik.errors.firstName && formik.touched.firstName)}>
                <FormLabel>First Name</FormLabel>
                <Field as={Input} name={'firstName'}></Field>
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl id={'lastName'} isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}>
                <FormLabel>Last Name</FormLabel>
                <Field as={Input} name={'lastName'}></Field>
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl id={'email'} isInvalid={!!(formik.errors.email && formik.touched.email)}>
                <FormLabel>Email</FormLabel>
                <Field as={Input} name={'email'}></Field>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <Button
                className="submit-button"
                isLoading={isLoading}
                type="submit"
                colorScheme="brand"
                variant="outline"
                _hover={{
                  backgroundColor: 'brand.500',
                  border: '1px solid transparent',
                  color: 'white',
                }}
                disabled={!formik.dirty || formik.isSubmitting}
              >
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
