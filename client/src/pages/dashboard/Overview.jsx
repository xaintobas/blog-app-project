import React, { useEffect, useState } from 'react';
import { FiFileText, FiGrid, FiTag, FiUsers } from 'react-icons/fi';
import api from '../../utils/api';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', minWidth: '200px' }}>
    <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{value}</h3>
      <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{title}</p>
    </div>
  </div>
);

const Overview = () => {
  const [stats, setStats] = useState({ posts: 0, categories: 0, tags: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, categoriesRes, tagsRes, usersRes] = await Promise.all([
          api.get('/posts').catch(() => ({ data: { count: 0 } })),
          api.get('/categories').catch(() => ({ data: { count: 0 } })),
          api.get('/tags').catch(() => ({ data: { count: 0 } })),
          api.get('/users').catch(() => ({ data: { count: 0 } }))
        ]);

        setStats({
          posts: postsRes.data.count || 0,
          categories: categoriesRes.data.count || 0,
          tags: tagsRes.data.count || 0,
          users: usersRes.data.count || 0
        });
      } catch (err) {
        setError('Failed to fetch overview statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {error && <div style={{ padding: '1rem', backgroundColor: 'var(--danger-color)', color: 'white', borderRadius: '8px', marginBottom: '2rem' }}>{error} (Check DB Connection)</div>}
      
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <StatCard title="Total Posts" value={loading ? '...' : stats.posts} icon={<FiFileText />} color="#3b82f6" />
        <StatCard title="Categories" value={loading ? '...' : stats.categories} icon={<FiGrid />} color="#8b5cf6" />
        <StatCard title="Tags" value={loading ? '...' : stats.tags} icon={<FiTag />} color="#10b981" />
        <StatCard title="Users" value={loading ? '...' : stats.users} icon={<FiUsers />} color="#f59e0b" />
      </div>
      
      <div className="glass-card">
        <h3>Recent Activity</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Activity tracking not yet implemented.</p>
      </div>
    </div>
  );
};

export default Overview;
