import React from 'react';

// import FriendsList from './FriendsList';
import PageLayout from '../components/PageLayout';
import ItemList from '../components/ItemList';

function TestPage() {
  return (
    <PageLayout showNavigation={false}>
      <ItemList />
    </PageLayout>
  );
}

export default TestPage;
