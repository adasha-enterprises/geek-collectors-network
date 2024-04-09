import React from 'react';
import { VStack } from '@chakra-ui/react';

import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <VStack
      className="background"
    >
      <LoginForm />
    </VStack>
  );
}

export default LoginPage;
