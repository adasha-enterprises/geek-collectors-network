import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/landing/Landing';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import AccountInfo from './pages/account/AccountInfo';
import ProfileInfo from './pages/profile/ProfileInfo';
import UserProfile from './pages/profile/UserProfile';
import UserList from './pages/networking/UserList';
import Friends from './pages/friends/Friends';
import { ItemFeed, ItemCollection, ItemWishlist } from './pages/items/Items';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />

      <Route path="/feed" element={<ItemFeed />} />

      <Route path="/profile" >
        <Route index element={<ProfileInfo />} />
        <Route path="edit" element={<ProfileInfo />} />
        <Route path=":userId" element={<UserProfile />} />
      </Route>

      <Route path="/account" element={<AccountInfo />} />

      <Route path="/userlist" element={<UserList />} />
      <Route path="/friends" element={<Friends />} />

      <Route path="/collection" element={<ItemCollection />} />
      <Route path="/wishlist" element={<ItemWishlist />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
