// Header.js

import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://seeklogo.com/images/C/cras-logo-902CB72BB8-seeklogo.com.png" alt="Logo" />
      </div>
      <div className="nav-links">
        <Link to="/professores">Professores</Link>
        <Link to="/turmas">Turmas</Link>
        <Link to="/jogos">Jogos</Link>
      </div>
    </header>
  );
}

export default Header;
