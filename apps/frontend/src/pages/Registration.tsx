import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from './PageLayout';
import PageTitle from '../components/PageTitle';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <PageLayout >
      <VStack
        bg={'background'}
        px={10}
        pt={14}
      >
        <PageTitle title={'Sign Up'} />
        <RegistrationForm />
      </VStack>
    </ PageLayout>
  );
}

export default Registration;
