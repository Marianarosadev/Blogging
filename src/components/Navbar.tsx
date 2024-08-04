import React from 'react';
import '../styles/components/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <span className="navbar__brand">Blogging</span>
      </div>
    </nav>
  );
};

export default Navbar;