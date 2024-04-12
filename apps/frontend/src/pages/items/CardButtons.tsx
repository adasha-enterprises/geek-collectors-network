import React from 'react';

import { AddIcon, DeleteIcon, StarIcon, ViewOffIcon } from '@chakra-ui/icons'; // Assuming ViewIcon for opening modal

type CardButton = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
  colorScheme?: string,
  onClick?: () => void
}

const addToCollectionButton = (itemId: number) => ({
  label: 'Add to Collection',
  icon: <AddIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Adding item ${itemId} to Collection...`);
    fetch('/api/v1/user/collection', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});

const removeFromCollectionButton = (itemId: number) => ({
  label: 'Remove from Collection',
  icon: <DeleteIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Removing item ${itemId} from Collection...`);
    fetch(`/api/v1/user/collection/${itemId}`, { method: 'DELETE' });
  },
});

const addToWishlistButton = (itemId: number) => ({
  label: 'Add to Wishlist',
  icon: <StarIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Adding item ${itemId} to Wishlist...`);
    fetch('/api/v1/user/wishlist', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});

const removeFromWishlistButton = (itemId: number) => ({
  label: 'Remove from Wishlist',
  icon: <DeleteIcon />,
  variant: 'solid',
  colorScheme: 'brand',
  onClick: () => {
    console.log(`Removing item ${itemId} from Wishlist...`);
    fetch(`/api/v1/user/wishlist/${itemId}`, { method: 'DELETE' });
  },
});

const hideItemButton = (itemId: number) => ({
  label: 'Hide',
  icon: <ViewOffIcon />,
  variant: 'solid',
  colorScheme: 'gray',
  onClick: () => {
    console.log(`Hiding item ${itemId} from feed...`);
  },
});

export { addToCollectionButton, addToWishlistButton, removeFromCollectionButton, removeFromWishlistButton, hideItemButton, CardButton };
