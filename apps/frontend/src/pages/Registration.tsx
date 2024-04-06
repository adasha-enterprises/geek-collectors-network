import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from '../components/PageLayout';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <PageLayout showNavigation={false}>
      <VStack
        bg={'background'}
        px={10}
        pt={14}
      >
        <RegistrationForm />
      </VStack>
    </ PageLayout>
  );
}

export default Registration;
