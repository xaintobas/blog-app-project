import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await api.get('/tags');
      setTags(res.data.data);
    } catch (err) {
      setError('Failed to fetch tags.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await api.post('/tags', { name });
      setTags([...tags, res.data.data]);
      setName('');
    } catch (err) {
      alert('Failed to add tag.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;
    try {
      await api.delete(`/tags/${id}`);
      setTags(tags.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete tag.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div className="glass-card" style={{ flex: '1 1 300px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Add New Tag</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Tag name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!name}>Add Tag</button>
        </form>
      </div>
      
      <div className="glass-card" style={{ flex: '2 1 500px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>All Tags</h3>
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Slug</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" style={{ padding: '1rem' }}>Loading...</td></tr>
              ) : tags.length === 0 ? (
                <tr><td colSpan="3" style={{ padding: '1rem' }}>No tags found.</td></tr>
              ) : (
                tags.map(tag => (
                  <tr key={tag._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>{tag.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{tag.slug}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDelete(tag._id)} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tags;
