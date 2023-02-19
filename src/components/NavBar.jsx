import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setQuery } from "../reducer/slices/movieSlice";
import "../styles/NavBar.scss";

const NavBar = () => {
  const inputReff = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputReff.current.value) {
      navigate(`search?query=${inputReff.current.value}`);
      dispatch(setQuery(inputReff.current.value));
      inputReff.current.value = "";
    }
  };

  return (
    <div className="navbar">
      <img
        className="brand-logo"
        src={`${window.location.origin}/logo.png`}
        alt="brand-logo"
      />
      <Link className="brand-name" to="/">
        Movie Time
      </Link>
      <input
        data-testid="search"
        ref={inputReff}
        onKeyDown={handleKeyDown}
        className="navebar-search"
        placeholder="Search movie by name"
      />
    </div>
  );
};

export default NavBar;
