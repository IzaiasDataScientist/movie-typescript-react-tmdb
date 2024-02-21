import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import { IMovie } from "../interface/IMovie";

import { useFetch } from "../hooks/useFetch";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const query = searchParams.get("q");
  // console.log(query);
  

  // const getSearchedMovies = async (url: string) => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data);
    
  //   setMovies(data.results);    
  // };

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        const data = await useFetch<IMovie[]>(searchWithQueryURL);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && 
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search