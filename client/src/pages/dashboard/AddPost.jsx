import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FiImage } from 'react-icons/fi';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [coverImage, setCoverImage] = useState('no-image.jpg');
  
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          api.get('/categories'),
          api.get('/tags')
        ]);
        setCategories(catRes.data.data);
        setAvailableTags(tagRes.data.data);
      } catch (err) {
        setError('Failed to load categories or tags.');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      // Use standard axios config for multipart form data
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        setCoverImage(res.data.url);
      }
    } catch (err) {
      alert('Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !category) {
      alert('Title, Content, and Category are required.');
      return;
    }

    try {
      const res = await api.post('/posts', {
        title,
        content,
        category,
        tags: selectedTags,
        coverImage,
        published: true
      });
      alert('Post created successfully!');
      navigate('/dashboard/posts');
    } catch (err) {
      alert('Failed to create post.');
    }
  };
  
  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: '1.5rem' }}>Create New Post</h3>
      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
      
      <div className="input-group">
        <label>Post Title</label>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Enter post title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="input-group">
            <label>Category</label>
            <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="input-group">
            <label>Tags (Select Multiple)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              {availableTags.map(tag => (
                <div 
                  key={tag._id}
                  onClick={() => handleTagToggle(tag._id)}
                  style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    backgroundColor: selectedTags.includes(tag._id) ? 'var(--primary-color)' : 'var(--border-color)',
                    color: selectedTags.includes(tag._id) ? 'white' : 'var(--text-color)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tag.name}
                </div>
              ))}
              {availableTags.length === 0 && <span style={{ color: 'var(--text-muted)' }}>No tags available</span>}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: '500' }}>Featured Image</label>
          <div style={{ 
            width: '100%', 
            height: '200px', 
            borderRadius: '12px', 
            border: '2px dashed var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {coverImage !== 'no-image.jpg' ? (
              <img src={coverImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <FiImage size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-muted)' }}>{uploadingImage ? 'Uploading...' : 'Click to upload image'}</p>
              </>
            )}
            
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="input-group" style={{ marginBottom: '2rem' }}>
        <label>Content</label>
        <textarea 
          className="input-field" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ height: '300px', resize: 'vertical' }} 
          placeholder="Write your post content here..."
        />
      </div>
      
      <button onClick={handleSubmit} className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading || uploadingImage}>
        Publish Post
      </button>
    </div>
  );
};

export default AddPost;
