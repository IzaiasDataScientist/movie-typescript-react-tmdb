import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import './MoviesGrid.css';

import { IMovie } from "../interface/IMovie";
import { useFetch } from "../hooks/useFetch";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const topRateUrl = `${moviesURL}top_rated?${apiKey}`;
        const data = await useFetch<IMovie[]>(topRateUrl);
        setTopMovies(data.results);
      } catch (error) {
        console.error("Error fetching home:", error);
      }
    };

    fetchHome();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home