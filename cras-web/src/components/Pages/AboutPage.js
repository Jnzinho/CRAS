import React from 'react';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import moment from 'moment';
// import { FaPencilAlt, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import Modal from 'react-modal';

function AboutPage() {
	return (
<div className="bg-white flex items-center  n justify-center overflow-hidden ">
    <div className="relative mx-auto h-full px-4  pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row py-16">
            <div className=" relative ">
                <div className=" absolute top-0 -left-48 z-0  opacity-50 ">
                    {/* <img src="https://placehold.co/200x100" className="w-36 z-0  h-full    object-fill fill-y text-y   "/> */}
                </div>
                <div className="lg:max-w-xl lg:pr-5  z-0">
                    <p className="flex text-sm uppercase text-g1  ">
                         
                        Sobre a gente
                    </p>
                    <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                        o CRAS é seu
                        <span className="my-1 inline-block border-b-8 border-g4 bg-white px-4 font-bold text-g4 animate__animated animate__flash">DIREITO</span>
                    </h2>
                    <p className="text-base text-gray-700">O Centro de Referência de Assistência Social - CRAS é uma unidade pública de atendimento à população e são oferecidos os serviços de Assistência Social. .</p>
                    <div className="mt-10 flex flex-col items-center md:flex-row">
                        <a href="https://www.gov.br/pt-br/servicos/acessar-o-cras-centro-de-referencia-da-assistencia-social" target='_blank' className="pointer mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-green-600 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-blue-800 focus:outline-none md:mr-4 md:mb-0 md:w-auto">
                            Saiba mais</a>
                        <a href="https://www.chapeco.sc.gov.br/conteudo/281/centros-de-referEncia-de-assistEncia-social-cras" target='_blank' aria-label="" className="group inline-flex items-center font-semibold text-g1">
                            Veja como funciona
                            <svg xmlns="https://www.gov.br/pt-br/servicos/acessar-o-cras-centro-de-referencia-da-assistencia-social" className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                
               
            </div>
            <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-white p-2 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
                </svg>
                <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
                     <img src="https://desenvolvimentosocial.rc.sp.gov.br/wp-content/uploads/2020/01/cras.png" />
                </div>
            </div>
        </div>
    </div> 
</div>
	)
}

export default AboutPage;