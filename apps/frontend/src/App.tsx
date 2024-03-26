import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AccountInfo from './pages/AccountInfo';
import ProfileInfo from './pages/ProfileInfo';
import UserProfile from './pages/UserProfile';
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
        <Route path=":username" element={<UserProfile avatar="https://bit.ly/broken-link" username="John Doe" about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." interests={['Interest', 'Another Interest', 'One More Interest', 'Last Interest']} />} />
      </Route>

      {/* 404 */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
