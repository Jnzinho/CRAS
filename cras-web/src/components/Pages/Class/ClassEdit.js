import React, { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function GameEdit({ onModalClose, selectedClass, onEdit }) {
  useEffect(() => {
    if (selectedClass) {
      document.getElementById('description').value = selectedClass.description;
      document.getElementById('code').value = selectedClass.code;
    }
  }, [selectedClass]);

  return (
    <div>
      <AiOutlineCloseCircle
        style={{ fontSize: '24px', textAlign: 'end', cursor: 'pointer' }}
        className="absolute right-1 top-1"
        onClick={onModalClose}
      />
      <form id="edit-form" onSubmit={onEdit}>
        <div className="flex flex-col p-4">
          <label htmlFor="description">Descrição</label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col p-4">
          <label htmlFor="code">Código</label>
          <textarea
            type="text"
            name="code"
            id="code"
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

export default GameEdit;
