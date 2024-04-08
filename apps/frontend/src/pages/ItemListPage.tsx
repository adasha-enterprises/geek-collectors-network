import React from 'react';
import { useLocation } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';

import ItemList from '../components/ItemList';
import PageLayout from '../components/PageLayout';


function ItemCollectionPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/collection?id=${userId}` : '/api/v1/user/collection';

  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
        />
      </VStack>
    </PageLayout>
  );
}

function ItemWishlistPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/wishlist?id=${userId}` : '/api/v1/user/wishlist';

  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <ItemList
          url={url}
        />
      </VStack>
    </PageLayout>
  );
}

export { ItemCollectionPage, ItemWishlistPage };
