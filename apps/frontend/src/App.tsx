import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AccountInfo from './pages/AccountInfo';
import ProfileInfo from './pages/ProfileInfo';
import Test from './pages/TestPage';
import UserListTestPage from './pages/UserListTestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/test" element={<Test />} />
      <Route path="/userlist" element={<UserListTestPage />} />

      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/account" element={<AccountInfo />} />
      {/* Profile page and profile edit page */}
      <Route path="/profile" >
        <Route index element={<ProfileInfo />} />
        <Route path="edit" element={<ProfileInfo />} />
      </Route>

      {/* 404 */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
