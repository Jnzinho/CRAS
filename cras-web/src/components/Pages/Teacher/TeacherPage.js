import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import TeacherEdit from './TeacherEdit';
import TeacherNew from './TeacherNew';

function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({});

  async function removeTeacher(id) {
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
      await axios.delete(`http://localhost:3000/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
      Swal.fire('Deletado!', 'O professor foi deletado.', 'success');
    }
  }

  async function getTeachers() {
    const response = await axios.get('http://localhost:3000/teachers');
    return response.data;
  }

  async function onModalClose() {
    setModalIsOpen(false);
    setSelectedTeacher(null);
  }

  async function handleEditClick(row) {
    setIsCreating(false);
    setModalIsOpen(true);
    setSelectedTeacher(row);
  }

  async function createTeacher(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('create-form');
    const name = form.elements.name.value;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const data = {
      name,
      username,
      password,
    };
    try {
      const response = await axios.post('http://localhost:3000/teachers', data);
      if (response.error) {
        Swal.fire('Erro!', `${response.error}`, 'error');
      }    
      const updatedTeachers = await getTeachers();
      setTeachers(updatedTeachers);
      setIsCreating(false);
      form.reset();
    } catch (err) {
      Swal.fire('Erro!', `${err.response.data.error}`, 'error');
    }
  }

  async function onEdit(e) {
    // post
    e.preventDefault();
    const form = document.getElementById('edit-form');
    const name = form.elements.name.value;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const data = {
      name,
      username,
      password,
    };
    await axios.put(
      `http://localhost:3000/teachers/${selectedTeacher.id}`,
      data
    );
    const updatedTeachers = await getTeachers();
    setTeachers(updatedTeachers);
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
      name: 'Usuário',
      selector: (row) => row.username,
      sortable: true,
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
          onClick={() => removeTeacher(row.id)}
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
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {isCreating ? (
        <TeacherNew
          setIsCreating={setIsCreating}
          createTeacher={createTeacher}
        ></TeacherNew>
      ) : (
        <div>
          <div className="text-center pb-2 font-bold">Professores</div>
          <button
            onClick={() => setIsCreating(true)}
            className="btn btn-primary bg-blue-600 p-1 text-white rounded mb-2"
          >
            Novo Professor
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
            <TeacherEdit
              onModalClose={onModalClose}
              selectedTeacher={selectedTeacher}
              onEdit={onEdit}
            />
          </Modal>
          <DataTable
            title="Professores"
            columns={columns}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            data={teachers}
            pagination={true}
            className="rounded-lg shadow-lg border"
            paginationComponentOptions={{
              rowsPerPageText: 'Professores por página:',
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

export default TeacherPage;
