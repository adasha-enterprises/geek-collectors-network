import React from 'react';

// import FriendsList from './FriendsList';
import PageLayout from '../components/PageLayout';
import ItemCard from '../components/ItemCard';
import { DeleteIcon } from '@chakra-ui/icons';

const item = {
  title: 'Star Wars Darth Vader Electronic Vinyl Figure #343',
  description: 'Celebrate one of pop cultures most recognizable villains and proclaim your allegiance to the dark side with an electronic Pop! Darth Vader.',
  itemImage: 'http://uncleodiescollectibles.com/img_lib/Star%20Wars%20Collectibles%20240%208-9-21.jpg',
};

const button = {
  label: 'Delete Item',
  icon: <DeleteIcon />,
  variant: 'solid',
  colorScheme: '',
  onClick: () => console.log('Deleting item from list...'),

};


function TestPage() {
  return (
    <PageLayout showNavigation={false}>
      <ItemCard
        itemData={item}
        button={button}
      />
      {/* <FriendsList /> */}
    </PageLayout>
  );
}

export default TestPage;
