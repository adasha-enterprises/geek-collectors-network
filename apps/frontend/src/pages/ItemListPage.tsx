import React from 'react';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';


function ItemListPage() {
  console.log('FriendsListPage');
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <ItemList />
    </VStack>
  );
}

export default ItemListPage;
