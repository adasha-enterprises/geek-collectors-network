import React, { useEffect, useState } from 'react';

import SearchBar from './SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from './LoadingAnimation';
import ItemCard from './ItemCard';
import { DeleteIcon } from '@chakra-ui/icons';
import { SimpleGrid, VStack, Container, Center } from '@chakra-ui/react';
import PageTitle from './PageTitle';

type Item = {
    id: string,
    name: string,
    description: string,
    imageUrl: string
}

function ItemList() {
  // TODO: Replace URL with actual API endpoint
  const { data: items, isLoading } = useFetchData<Item>('https://dummyjson.com/products/category/smartphones?limit=8', 'products');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // Update `filteredItems` list whenever `items` updated
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // Filter function for Item Search Bar
  const handleItemSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filteredQueries = items.filter(item => item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery));
    setFilteredItems(filteredQueries);
  };

  const button = {
    label: 'Delete Item',
    icon: <DeleteIcon />,
    variant: 'solid',
    colorScheme: '',
    onClick: () => console.log('Deleting item from list...'),

  };

  // Choose layout based on whether there are items to display
  const itemListLayout = filteredItems.length <= 0 ? (
    <Center w="full">No items found</Center>
  ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {filteredItems.map(item => (
        <ItemCard
          key={item.id}
          itemData={{ title: item.name, description: item.description, itemImage: item.imageUrl }}
          button={button}
        />
      ))}
    </SimpleGrid>
  );

  // Display the chosen layout
  return (
    <Container maxW="container.xl" centerContent p={'0'}>
      <VStack
        bg={'background'}
        px={10}
        pt={14}
        spacing={4}
        width={{ base: '100%', md: '90%', lg: '80%' }}
      >
        <PageTitle title={'Your Wishlist'} />
        <SearchBar onSearch={handleItemSearch} />
        {isLoading ? loadingAnimation : itemListLayout}
      </VStack>
    </Container>
  );
}

export default ItemList;
