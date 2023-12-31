import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import TeacherPage from './components/Pages/Teacher/TeacherPage';
import ClassPage from './components/Pages/Class/ClassPage';
import GamePage from './components/Pages/Game/GamePage';
import VideoPage from './components/Pages/Video/VideoPage';
import JogoTestePage from './components/Pages/JogoTestePage';
import AboutPage from './components/Pages/AboutPage';
import Layout from './components/Layout';
import GameList from './components/Pages/Game/GameList';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/professores',
        element: <TeacherPage />,
      },
      {
        path: '/turmas',
        element: <ClassPage />,
      },
      {
        path: '/jogos',
        element: <GamePage />,
      },
      {
        path: '/videos',
        element: <VideoPage />
      },
      {
        path: '/jogo-teste',
        element: <JogoTestePage />
      },
      {
        path: '/sobre',
        element: <AboutPage />
      },
      {
        path: '/jogar',
        element: <GameList />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
