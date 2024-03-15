import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from '../components/PageLayout';
import PageTitle from '../components/PageTitle';
import LoginForm from '../components/LoginForm';

// Add Header component created by Toco following rebase / merge
function LoginPage() {
  return (
    <PageLayout showNavigation={false}>
      <VStack
        bg={'background'}
        px={10}
        pt={20}
      >
        <PageTitle title={'Login'} />
        <LoginForm />
      </VStack>
    </PageLayout>
  );
}

export default LoginPage;
