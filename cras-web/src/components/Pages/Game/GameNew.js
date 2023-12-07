import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function GameNew({ setIsCreating, createGame }) {
  return (
    <div>
      <div className="text-center font-bold flex items-center justify-center">
        <button
          onClick={() => setIsCreating(false)}
          className="btn btn-primary bg-gray-600 p-1 text-white rounded mr-3"
        >
          <FaArrowLeft />
        </button>
        Criar Jogo
      </div>
      <form id="create-form" onSubmit={createGame}>
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
          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            id="description"
            className="border rounded-lg p-2"
            rows={5}
          />
        </div>
        <div className="flex flex-col p-4">
          <label htmlFor="url">Url</label>
          <textarea
            name="url"
            id="url"
            className="border rounded-lg p-2"
            rows={5}
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

export default GameNew;
