import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--sidebar-bg)', borderTop: '1px solid var(--border-color)', padding: '3rem 2rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>UyiBlog</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            A modern, full-stack blogging platform. Built with React, Node.js, Express, and MongoDB.
            Discover brilliant ideas and insights from our top authors.
          </p>
        </div>
        
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
            <li><Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>Dashboard</Link></li>
            <li><Link to="/login" style={{ color: 'var(--text-muted)' }}>Login</Link></li>
          </ul>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
            <li><Link to="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
          </ul>
        </div>
        
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Connect With Us</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'var(--bg-color)', borderRadius: '50%' }}><FiTwitter /></a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'var(--bg-color)', borderRadius: '50%' }}><FiGithub /></a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '0.5rem', backgroundColor: 'var(--bg-color)', borderRadius: '50%' }}><FiLinkedin /></a>
          </div>
        </div>

      </div>
      
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} GeniBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
