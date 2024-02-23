import React from 'react';
import { VStack } from '@chakra-ui/react';

import PageLayout from './PageLayout';
import PageTitle from '../components/PageTitle';

interface LoginPageProps {
  formComponent: React.ReactNode;
}

// Add Header component created by Toco following rebase / merge
function LoginPage({ formComponent }: LoginPageProps) {
  return (
    <PageLayout>
      <VStack
        bg={'background'}
        px={10}
        pt={20}
      >
        <PageTitle title={'Login'} />
        {formComponent}
      </VStack>
    </PageLayout>
  );
}

export default LoginPage;
