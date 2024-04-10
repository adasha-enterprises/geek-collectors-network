import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import Registration from './pages/registration/Registration';
import LoginPage from './pages/login/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AccountInfo from './pages/account/AccountInfo';
import ProfileInfo from './pages/profile/ProfileInfo';
import UserProfile from './pages/profile/UserProfile';
import UserListTestPage from './pages/UserListTestPage';
import FriendsListPage from './pages/FriendsListPage';
import { ItemFeedPage, ItemCollectionPage, ItemWishlistPage } from './pages/ItemListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/feed" element={<ItemFeedPage />} />

      <Route path="/profile" >
        <Route index element={<ProfileInfo />} />
        <Route path="edit" element={<ProfileInfo />} />
        <Route path=":userId" element={<UserProfile />} />
      </Route>

      <Route path="/account" element={<AccountInfo />} />

      <Route path="/userlist" element={<UserListTestPage />} />
      <Route path="/friendslist" element={<FriendsListPage />} />

      <Route path="/collection" element={<ItemCollectionPage />} />
      <Route path="/wishlist" element={<ItemWishlistPage />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
