import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GameList() {
    const [games, setGames] = useState([]);

    async function getGames() {
        const response = await axios.get('http://localhost:3000/games');
        return response.data;
    }

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

    // const renderedGames = games.map({

    // })

    return (
        <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 pb-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white text-center">Jogos disponíveis</h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <Link to='/jogo-teste' className="lg:flex shadow p-3 cursor-pointer hover:scale-105 transition-all">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://tcf.admeen.org/category/3000/2952/400x400/fireboy-watergirl.jpg" alt="" />
                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <div className="text-xl font-semibold text-gray-800 dark:text-white ">
                        Watergirl and Fireboy
                    </div>
                    <div className="p-0 m-0 text-sm">
                        Um jogo de quebra cabeça cooperativo onde as crianças irão poder aprender sobre trabalho em grupo e cooperação!
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Cooperação</span>
                </div>
            </Link>

            <div className="lg:flex shadow p-3 cursor-pointer hover:scale-105 transition-all">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://cdn.jogos360.com.br/jo/go/jogo-da-reciclagem-d.jpg" alt="" />

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 dark:text-white ">
                        Jogo de reciclagem
                    </a>
                    <div className="p-0 m-0 text-sm">
                        Um jogo quebra cabeça simples de reciclagem, para divertir e ensinar boas ações!
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Reciclagem</span>
                </div>
            </div>

            <div className="lg:flex shadow p-3 cursor-pointer hover:scale-105 transition-all">
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src="https://tcf.admeen.org/category/500/400/400x400/traffic.jpg" alt="" />

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 dark:text-white ">
                        Transito 22
                    </a>
                    <div className="p-0 m-0 text-sm">
                        Um jogo de quebra cabeça cooperativo onde as crianças irão poder aprender sobre trabalho em grupo e cooperação!
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Trânsito</span>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}

export default GameList;