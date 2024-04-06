import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AccountInfo from './pages/AccountInfo';
import ProfileInfo from './pages/ProfileInfo';
import UserProfile from './pages/UserProfile';
import UserListTestPage from './pages/UserListTestPage';
import FriendsListPage from './pages/FriendsListPage';
import { ItemCollectionPage, ItemWishlistPage } from './pages/ItemListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/userlist" element={<UserListTestPage />} />
      <Route path="/friendslist" element={<FriendsListPage />} />
      <Route path="/collection" element={<ItemCollectionPage />} />
      <Route path="/wishlist" element={<ItemWishlistPage />} />


      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/account" element={<AccountInfo />} />

      {/* Profile page and profile edit page */}
      <Route path="/profile" >
        <Route index element={<ProfileInfo />} />
        <Route path="edit" element={<ProfileInfo />} />
        <Route path=":userId" element={<UserProfile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
