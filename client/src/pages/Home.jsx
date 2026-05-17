import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiArrowRight } from 'react-icons/fi';
import Footer from '../components/Footer';
import api from '../utils/api';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        // Filter only published posts
        const publishedPosts = res.data.data.filter(p => p.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '1.8rem', margin: 0 }}>GeniBlog</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="theme-toggle" onClick={toggleTheme} style={{ margin: 0, padding: '0.5rem' }}>
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </div>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
            Dashboard
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>Discover Brilliant Ideas</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A modern, full-stack blogging platform with dynamic themes and powerful management tools.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading latest posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts published yet. Check back soon!</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {posts.map(post => (
              <div key={post._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ 
                  height: '200px', 
                  backgroundColor: 'var(--border-color)', 
                  borderRadius: '8px', 
                  marginBottom: '1rem',
                  overflow: 'hidden'
                }}>
                  {post.coverImage && post.coverImage !== 'no-image.jpg' ? (
                    <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      No Image
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '4px' }}>
                    {post.category?.name || 'Uncategorized'}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {post.content}
                </p>
                
                <Link to={`/post/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                  Read More <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
