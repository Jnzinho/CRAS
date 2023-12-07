import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import GameEdit from './GameEdit.js';
import GameNew from './GameNew';

function GamePage() {
  const [games, setGames] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});

  async function removeGame(id) {
    const confirmation = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    });
    if (confirmation.isConfirmed) {
      await axios.delete(`http://localhost:3000/games/${id}`);
      setGames(games.filter((game) => game.id !== id));
      Swal.fire('Deletado!', 'O jogo foi deletado.', 'success');
    }
  }

  async function getGames() {
    const response = await axios.get('http://localhost:3000/games');
    return response.data;
  }

  async function onModalClose() {
    setModalIsOpen(false);
    setSelectedGame(null);
  }

  async function handleEditClick(row) {
    setIsCreating(false);
    setModalIsOpen(true);
    setSelectedGame(row);
  }

  async function createGame(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('create-form');
    const name = form.elements.name.value;
    const description = form.elements.description.value;
    const url = form.elements.url.value;
    const data = {
      name,
      description,
      url,
    };
    await axios.post('http://localhost:3000/games', data);
    const updatedGames = await getGames();
    setGames(updatedGames);
    setIsCreating(false);
    form.reset();
  }

  async function onEdit(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('edit-form');
    const name = form.elements.name.value;
    const description = form.elements.description.value;
    const url = form.elements.url.value;
    const data = {
      name,
      description,
      url,
    };
    await axios.put(`http://localhost:3000/games/${selectedGame.id}`, data);
    const updatedGames = await getGames();
    setGames(updatedGames);
    setModalIsOpen(false);
    form.reset();
  }

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: 'Criado em',
      selector: (row) => row.createdAt,
      cell: (row) => moment(row.createdAt).format('DD/MM/YYYY HH:mm'),
      sortable: true,
    },
    {
      name: 'Atualizado em',
      selector: (row) => row.updatedAt,
      cell: (row) => moment(row.updatedAt).format('DD/MM/YYYY HH:mm'),
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          onClick={() => handleEditClick(row)}
          className="btn btn-primary bg-yellow-500 p-1 text-white rounded"
        >
          <FaPencilAlt />
        </button>
      ),
      width: '50px',
    },
    {
      cell: (row) => (
        <button
          onClick={() => removeGame(row.id)}
          className="btn btn-danger bg-red-600 p-1 text-white rounded"
        >
          <FaTrash />
        </button>
      ),
      width: '50px',
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isCreating ? (
        <GameNew
          setIsCreating={setIsCreating}
          createGame={createGame}
        ></GameNew>
      ) : (
        <div className='p-2'>
          <h1 className="text-center pb-2 font-bold">Jogos</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="btn btn-primary bg-blue-600 p-1 text-white rounded mb-2"
          >
            Novo Jogo
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={onModalClose}
            style={{
              overlay: {
                zIndex: 1000,
              },
              content: {
                zIndex: 1000,
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '0px',
                overflow: 'hidden',
              },
            }}
          >
            <GameEdit
              onModalClose={onModalClose}
              selectedGame={selectedGame}
              onEdit={onEdit}
            />
          </Modal>
          <DataTable
            title="Jogos"
            columns={columns}
            data={games}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            pagination={true}
            className="rounded-lg shadow-lg border"
            paginationComponentOptions={{
              rowsPerPageText: 'Jogos por página:',
              rangeSeparatorText: 'de',
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: 'Todos',
            }}
            noHeader
            ariaHideApp={false}
          />
        </div>
      )}
    </div>
  );
}

export default GamePage;
