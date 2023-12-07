import React from 'react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import moment from 'moment';
// import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import Modal from 'react-modal';

function JogoTestePage() {
	return (
		<div>
			<h1 className='text-center mb-5'>Watergirl and Fireboy</h1>
			<div className='flex flex-row align-center justify-center'>
				<iframe
			style={{ width: '80%', height: '550px', overflow: 'hidden' }}
					src="https://project-lolu.github.io/games/FireboyAndWatergirl/"
					scrolling="no"
					title="Checkers">
				</iframe>
			</div>
		</div>
	)
}

export default JogoTestePage;