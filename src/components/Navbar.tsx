import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/"> <BiCameraMovie />MoviesLib</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={handleSearch}
          value={search}
        />
        <button type="submit">
            <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  )
}

export default Navbar