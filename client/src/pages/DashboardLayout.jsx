import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div style={{ marginTop: '2rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
