import React from 'react';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';
import PageLayout from '../components/PageLayout';


function ItemListPage() {
  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList />
      </VStack>
    </PageLayout>
  );
}

export default ItemListPage;
