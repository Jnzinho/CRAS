import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function VideoNew({ setIsCreating, createVideo }) {
  return (
    <div>
      <div className="text-center font-bold flex items-center justify-center">
        <button
          onClick={() => setIsCreating(false)}
          className="btn btn-primary bg-gray-600 p-1 text-white rounded mr-3"
        >
          <FaArrowLeft/>
        </button>
        Inserir vídeo
      </div>
      <form id="create-form" onSubmit={createVideo}>
        <div className="flex flex-col p-4">
          <label htmlFor="name">Endereço</label>
          <input
            type="text"
            name="link"
            id="link"
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

export default VideoNew;
