import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/widgets/SearchBar';
import useFetchData from '../../hooks/useFetchData';
import loadingAnimation from '../../components/widgets/LoadingAnimation';
import ItemCard from './ItemCard';
import { SimpleGrid, VStack, Text } from '@chakra-ui/react';
import ItemModal from './ItemModal';
import { CardButton } from './CardButtons';
import { ViewIcon } from '@chakra-ui/icons'; // Assuming ViewIcon for opening modal
import { TagInfo } from '../profile/TagInput';


type ActionProps = {
    label: string;
    onClick: () => void;
    variant: 'solid' | 'outline';
}

type Item = {
    id: number,
    name: string,
    description: string,
    imageUrl: string
    url: string
    tags: TagInfo[]
}

type ItemListProps = {
  url: string
  buttons?: ((itemId: number) => CardButton)[]
}


function ItemList({ url, buttons }: ItemListProps) {
  const { data: items, isLoading } = useFetchData<Item>(url);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);


  const handleItemSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = items.filter(item => item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery));
    setFilteredItems(filtered);
  };

  const itemListLayout = filteredItems.length <= 0 ? (
    <Text>No items found</Text>
  ) : (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={4}>
      {filteredItems.map(item => {
        const cardButtons = !buttons ? [] : buttons.map(button => button(item.id));
        return (
          <ItemCard
            key={item.id}
            itemData={{ title: item.name, description: item.description, itemImage: item.imageUrl }}
            buttons={cardButtons}
            onClick={() => {
              const clickedItem = items.find(listedItem => listedItem.id === item.id);
              setSelectedItem(clickedItem || null);
              setModalOpen(true);
            }}
          />
        );
      })}
    </SimpleGrid>
  );


  const itemListModal = () => {
    if (!selectedItem) {
      return (<></>);
    }
    const item = selectedItem!;
    const modelButtons:ActionProps[] = !buttons ? [] : buttons.map(button => {
      const cardButton = button(item.id);
      return ({
        label: cardButton.label,
        onClick: cardButton.onClick || (() => console.log(cardButton.label)),
        variant: 'outline',
      });
    });

    return (
      <ItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedItem(null); }} // Also reset selectedItem on close
        bodyProps={{
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          url: item.url,
          tags: item.tags,
        }}
        footerActions={[
          ...modelButtons,
        ]}
      />
    );
  };

  return (
    <VStack className="item-list">
      <SearchBar onSearch={handleItemSearch} />
      {isLoading ? loadingAnimation : itemListLayout}
      {itemListModal()}
    </VStack>
  );
}

export default ItemList;
