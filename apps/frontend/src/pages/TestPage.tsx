import React from 'react';
import { VStack } from '@chakra-ui/react';

import SearchBar from '../components/SearchBar';
import PageLayout from './PageLayout';

function TestPage() {
  return (
    <PageLayout>
      <VStack
        bg={'background'}
        px={10}
        pt={20}
      >
        <SearchBar onSearch={search => console.log(search)} />
      </VStack>
    </PageLayout>
  );
}

export default TestPage;
