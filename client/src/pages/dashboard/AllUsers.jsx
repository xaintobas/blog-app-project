import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Subscriber' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.data);
    } catch (err) {
      setError('Failed to fetch users. You might not be an Admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) return;
    try {
      const res = await api.post('/users', formData);
      setUsers([...users, res.data.data]);
      setFormData({ username: '', email: '', password: '', role: 'Subscriber' });
    } catch (err) {
      alert('Failed to add user.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      
      <div className="glass-card">
        <h3 style={{ marginBottom: '1.5rem' }}>Add New User</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 200px', margin: 0 }}>
            <label>Username</label>
            <input type="text" className="input-field" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
          </div>
          <div className="input-group" style={{ flex: '1 1 200px', margin: 0 }}>
            <label>Email</label>
            <input type="email" className="input-field" placeholder="Email address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="input-group" style={{ flex: '1 1 150px', margin: 0 }}>
            <label>Password</label>
            <input type="password" className="input-field" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <div className="input-group" style={{ flex: '1 1 150px', margin: 0 }}>
            <label>Role</label>
            <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="Subscriber">Subscriber</option>
              <option value="Author">Author</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Add User</button>
        </form>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>All Users</h3>
        </div>
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Username</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Joined</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ padding: '1rem' }}>Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: '1rem' }}>No users found.</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>{user.username}</td>
                    <td style={{ padding: '1rem' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        backgroundColor: user.role === 'Admin' ? 'var(--primary-color)' : user.role === 'Author' ? '#10b981' : '#f59e0b', 
                        color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' 
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDelete(user._id)} className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
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

export default AllUsers;
