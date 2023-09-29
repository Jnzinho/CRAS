import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import ClassEdit from './ClassEdit.js';
import ClassNew from './ClassNew.js';

function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});

  async function removeClass(id) {
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
      await axios.delete(`http://localhost:3000/classes/${id}`);
      setClasses(classes.filter((classe) => classe.id !== id));
      Swal.fire('Deletado!', 'A turma foi deletada.', 'success');
    }
  }

  async function getClasses() {
    const response = await axios.get('http://localhost:3000/classes');
    return response.data;
  }

  async function onModalClose() {
    setModalIsOpen(false);
    setSelectedClass(null);
  }

  async function handleEditClick(row) {
    setIsCreating(false);
    setModalIsOpen(true);
    setSelectedClass(row);
  }

  async function createClass(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('create-form');
    const description = form.elements.description.value;
    const code = form.elements.code.value;
    const data = {
      description,
      code,
    };
    await axios.post('http://localhost:3000/classes', data);
    const updatedClasses = await getClasses();
    setClasses(updatedClasses);
    setIsCreating(false);
    form.reset();
  }

  async function onEdit(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('edit-form');
    const description = form.elements.description.value;
    const code = form.elements.code.value;
    const data = {
      description,
      code,
    };
    await axios.put(`http://localhost:3000/classes/${selectedClass.id}`, data);
    const updatedClasses = await getClasses();
    setClasses(updatedClasses);
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
      name: 'Código',
      selector: (row) => row.code,
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
          onClick={() => removeClass(row.id)}
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
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {isCreating ? (
        <ClassNew
          setIsCreating={setIsCreating}
          createClass={createClass}
        ></ClassNew>
      ) : (
        <div>
          <div className="text-center pb-2 font-bold">Turmas</div>
          <button
            onClick={() => setIsCreating(true)}
            className="btn btn-primary bg-blue-600 p-1 text-white rounded mb-2"
          >
            Nova Turma
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
            <ClassEdit
              onModalClose={onModalClose}
              selectedClass={selectedClass}
              onEdit={onEdit}
            />
          </Modal>
          <DataTable
            title="Turmas"
            columns={columns}
            data={classes}
            pagination={true}
            className="rounded-lg shadow-lg border"
            paginationComponentOptions={{
              rowsPerPageText: 'Turmas por página:',
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

export default ClassPage;
