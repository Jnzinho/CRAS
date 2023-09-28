import React, { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function GameEdit({ onModalClose, selectGame, onEdit }) {
  useEffect(() => {
    if (selectGame) {
      document.getElementById('name').value = selectGame.name;
      document.getElementById('username').value = selectGame.username;
    }
  }, [selectGame]);

  function toggleShowPassword() {
    const password = document.getElementById('password');
    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }

  return (
    <div>
      <AiOutlineCloseCircle
        style={{ fontSize: '24px', textAlign: 'end', cursor: 'pointer' }}
        className="absolute right-1 top-1"
        onClick={onModalClose}
      />
      <form id="edit-form" onSubmit={onEdit}>
        <div className="flex flex-col p-4">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col p-4">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col p-4">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-lg p-2"
          />
          <input
            type="checkbox"
            name="showPassword"
            id="showPassword"
            className="mt-2"
            onChange={toggleShowPassword}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary bg-blue-600 p-1 mb-2 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default GameEdit;
