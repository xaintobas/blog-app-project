import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch (err) {
      setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await api.post('/categories', { name });
      setCategories([...categories, res.data.data]);
      setName('');
    } catch (err) {
      alert('Failed to add category. DB error or unauthorized.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete category.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div className="glass-card" style={{ flex: '1 1 300px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Category name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!name}>Add Category</button>
        </form>
      </div>
      
      <div className="glass-card" style={{ flex: '2 1 500px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>All Categories</h3>
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
              ) : categories.length === 0 ? (
                <tr><td colSpan="3" style={{ padding: '1rem' }}>No categories found.</td></tr>
              ) : (
                categories.map(category => (
                  <tr key={category._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>{category.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{category.slug}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDelete(category._id)} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
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

export default Categories;
