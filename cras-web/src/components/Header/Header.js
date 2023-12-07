// Header.js

import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo flex gap-1 flex-row items-center justify-center">
        <Link to="/">
          <img
            src="https://i.pinimg.com/originals/09/ab/f7/09abf7e93721f799faa437230f99c1d3.gif"
            alt="Logo"
          />
        </Link>
        <h3>CRAS - Centro de Referência de Assistência Social</h3>
      </div>
      <div className="nav-links">
        <Link to="/professores">Professores</Link>
        <Link to="/turmas">Turmas</Link>
        <Link to="/jogos">Jogos</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/jogo-teste">Jogo Teste</Link>
      </div>
    </header>
  );
}

export default Header;
