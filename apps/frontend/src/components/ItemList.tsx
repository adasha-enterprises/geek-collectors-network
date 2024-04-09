import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from './widgets/LoadingAnimation';
import ItemCard from './ItemCard';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'; // Assuming ViewIcon for opening modal
import { SimpleGrid, VStack, Container, Center } from '@chakra-ui/react';
import ItemModal from './ItemModal';

type Item = {
    id: number,
    name: string,
    description: string,
    imageUrl: string
    url: string
    tags: string[]
}

type ItemListProps = {
  url: string
}

function ItemList({ url }: ItemListProps) {
  const { data: items, isLoading } = useFetchData<Item>(url);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Changed to store an Item or null

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleItemSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = items.filter(item => item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery));
    setFilteredItems(filtered);
  };

  // Adjusted to accept itemId and return a configuration object
  const openItemModal = (itemId: number) => ({
    label: 'Open Item',
    icon: <ViewIcon />,
    variant: 'solid',
    colorScheme: 'brand',
    onClick: () => { // Updated to find and set the selected item based on itemId
      const item = items.find(listedItem => listedItem.id === itemId);
      setSelectedItem(item || null);
      setModalOpen(true);
    },
  });

  const deleteItem = {
    label: 'Delete Item',
    icon: <DeleteIcon />,
    variant: 'outline',
    colorScheme: 'brand',
    onClick: () => console.log('Deleting item...'), // Placeholder functionality
  };

  const itemListLayout = filteredItems.length <= 0 ? (
    <Center w="full">No items found</Center>
  ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {filteredItems.map(item => (
        <ItemCard
          key={item.id}
          itemData={{ title: item.name, description: item.description, itemImage: item.imageUrl }}
          // Dynamically configure buttons for each item
          buttons={[openItemModal(item.id), deleteItem]}
        />
      ))}
    </SimpleGrid>
  );

  return (
    <Container maxW="container.xl" centerContent p={'0'}>
      <VStack
        bg={'background'}
        px={10}
        pt={14}
        spacing={4}
        width={{ base: '100%', md: '90%', lg: '80%' }}
      >
        <SearchBar onSearch={handleItemSearch} />
        {isLoading ? loadingAnimation : itemListLayout}
        {selectedItem && ( // Render ItemModal conditionally based on selectedItem
          <ItemModal
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false); setSelectedItem(null); }} // Also reset selectedItem on close
            bodyProps={{
              id: selectedItem.id,
              name: selectedItem.name,
              description: selectedItem.description,
              imageUrl: selectedItem.imageUrl,
              url: selectedItem.url,
              tags: selectedItem.tags,
            }}
            footerActions={[
              {
                label: 'Close',
                onClick: () => setModalOpen(false),
                variant: 'outline',
              },
            ]}
          />
        )}
      </VStack>
    </Container>
  );
}

export default ItemList;
