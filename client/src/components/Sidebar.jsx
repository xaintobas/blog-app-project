import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiFileText, FiPlusSquare, FiGrid, FiTag, FiUsers, FiMoon, FiSun } from 'react-icons/fi';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <FiGrid /> UyiBlog
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/dashboard" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiHome /> Overview
        </NavLink>
        <NavLink to="/dashboard/posts" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiFileText /> All Posts
        </NavLink>
        <NavLink to="/dashboard/add-post" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiPlusSquare /> Add Post
        </NavLink>
        <NavLink to="/dashboard/categories" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiGrid /> Categories
        </NavLink>
        <NavLink to="/dashboard/tags" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiTag /> Tags
        </NavLink>
        {user?.role === 'Admin' && (
          <NavLink to="/dashboard/users" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            <FiUsers /> All Users
          </NavLink>
        )}
      </div>

      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <><FiMoon /> Dark Mode</> : <><FiSun /> Light Mode</>}
      </div>
    </div>
  );
};

export default Sidebar;
