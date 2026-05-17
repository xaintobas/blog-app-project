import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme(); // To optionally use theme context if needed

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${slug}`);
        setPost(res.data.data);
      } catch (err) {
        setError('Failed to fetch post. It might have been removed or does not exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-muted)' }}>Loading article...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger-color)', marginBottom: '2rem' }}>{error || 'Post not found.'}</h2>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiArrowLeft /> Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Mini Header */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <Link to="/" style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: '800', textDecoration: 'none' }}>GeniBlog</Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)' }}>
          <FiArrowLeft /> Back
        </Link>
      </header>

      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Cover Image */}
        {post.coverImage && post.coverImage !== 'no-image.jpg' && (
          <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Categories & Title */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {post.category && (
            <span style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem' }}>
              {post.category.name}
            </span>
          )}
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.5rem' }}>{post.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiUser /> {post.author?.username || 'Unknown Author'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCalendar /> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="blog-content"
          style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-color)', marginBottom: '3rem' }}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <FiTag style={{ color: 'var(--text-muted)' }} />
            {post.tags.map(tag => (
              <span key={tag._id} style={{ padding: '0.2rem 0.6rem', backgroundColor: 'var(--border-color)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                #{tag.name}
              </span>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default SinglePost;
