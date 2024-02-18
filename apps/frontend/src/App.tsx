import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration />} />

      {/* Profile page and profile edit page */}
      {/* <Route path="/profile" /> */}
      {/* <Route index element={<ProfilePage />} /> */}
      {/* <Route path="/edit" element={<ProfileEditPage />}  /> */}

      {/* 404 */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
