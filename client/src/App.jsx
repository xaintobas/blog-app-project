import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import AllPosts from './pages/dashboard/AllPosts';
import AddPost from './pages/dashboard/AddPost';
import Categories from './pages/dashboard/Categories';
import Tags from './pages/dashboard/Tags';
import AllUsers from './pages/dashboard/AllUsers';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path="posts" element={<AllPosts />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} />
          <Route path="users" element={<AllUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
