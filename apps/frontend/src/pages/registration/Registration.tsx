import React from 'react';
import { VStack } from '@chakra-ui/react';

import RegistrationForm from './RegistrationForm';

function Registration() {
  return (
    <VStack
      className="background"
    >
      <RegistrationForm />
    </VStack>
  );
}

export default Registration;
