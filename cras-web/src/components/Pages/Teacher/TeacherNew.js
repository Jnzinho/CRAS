import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function TeacherNew({ setIsCreating, createTeacher }) {
  return (
    <div>
      <div className="text-center font-bold flex items-center justify-center">
        <button
          onClick={() => setIsCreating(false)}
          className="btn btn-primary bg-gray-600 p-1 text-white rounded mr-3"
        >
          <FaArrowLeft />
        </button>
        Criar Professor
      </div>
      <form id="create-form" onSubmit={createTeacher}>
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

export default TeacherNew;
