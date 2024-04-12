import React from 'react';
import { useLocation } from 'react-router-dom';

import ItemList from './ItemList';
import PageLayout from '../../components/PageLayout';
import { addToCollectionButton, addToWishlistButton, removeFromCollectionButton, removeFromWishlistButton, hideItemButton, CardButton } from './CardButtons';

const ItemsTemplate = (url: string, buttons: ((itemId: number) => CardButton)[]) => (
  <PageLayout>
    <ItemList url={url} buttons={buttons} />
  </PageLayout>
);

function ItemFeed() {
  const url = '/api/v1/item/feed';
  const buttons = [addToCollectionButton, addToWishlistButton, hideItemButton];

  return ItemsTemplate(url, buttons);
}

function ItemCollection() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/collection?id=${userId}` : '/api/v1/user/collection';
  const buttons = userId ? [addToWishlistButton] : [removeFromCollectionButton];

  return ItemsTemplate(url, buttons);
}

function ItemWishlist() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get('userId');
  const url = userId ? `/api/v1/user/wishlist?id=${userId}` : '/api/v1/user/wishlist';
  const buttons = userId ? [addToWishlistButton] : [removeFromWishlistButton];

  return ItemsTemplate(url, buttons);
}

export { ItemFeed, ItemCollection, ItemWishlist };
