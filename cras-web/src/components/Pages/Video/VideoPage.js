import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import VideoEdit from './VideoEdit';
import VideoNew from './VideoNew';

function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});

  async function removeVideo(id) {
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
      await axios.delete(`http://localhost:3000/videos/${id}`);
      setVideos(videos.filter((video) => video.id !== id));
      Swal.fire('Deletado!', 'O professor foi deletado.', 'success');
    }
  }

  async function getVideos() {
    const response = await axios.get('http://localhost:3000/videos');
    return response.data;
  }

  async function onModalClose() {
    setModalIsOpen(false);
    setSelectedVideo(null);
  }

  async function handleEditClick(row) {
    setIsCreating(false);
    setModalIsOpen(true);
    setSelectedVideo(row);
  }

  async function createVideo(e) {
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
      const response = await axios.post('http://localhost:3000/videos', data);
      if (response.error) {
        Swal.fire('Erro!', `${response.error}`, 'error');
      }    
      const updatedVideos = await getVideos();
      setVideos(updatedVideos);
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
      `http://localhost:3000/videos/${selectedVideo.id}`,
      data
    );
    const updatedVideos = await getVideos();
    setVideos(updatedVideos);
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
      name: 'Endereço',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Título',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Adicionado em',
      selector: (row) => row.createdAt,
      cell: (row) => moment(row.createdAt).format('DD/MM/YYYY HH:mm'),
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
          onClick={() => removeVideo(row.id)}
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
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {isCreating ? (
        <VideoNew
          setIsCreating={setIsCreating}
          createVideo={createVideo}
        ></VideoNew>
      ) : (
        <div>
          <div className="text-center pb-2 font-bold">Vídeos</div>
          <button
            onClick={() => setIsCreating(true)}
            className="btn btn-primary bg-blue-600 p-1 text-white rounded mb-2"
          >
            Novo Vídeos
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
            <VideoEdit
              onModalClose={onModalClose}
              selectedVideo={selectedVideo}
              onEdit={onEdit}
            />
          </Modal>
          <DataTable
            title="Vídeos"
            columns={columns}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            data={videos}
            pagination={true}
            className="rounded-lg shadow-lg border"
            paginationComponentOptions={{
              rowsPerPageText: 'Vídeoses por página:',
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

export default VideoPage;
