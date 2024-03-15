import React from 'react';

import FriendsList from './FriendsList';
import PageLayout from '../components/PageLayout';

function TestPage() {
  return (
    <PageLayout showNavigation={false}>
      <FriendsList />
    </PageLayout>
  );
}

export default TestPage;
