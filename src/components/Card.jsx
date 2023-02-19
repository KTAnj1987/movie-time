import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card.scss";

const Card = ({ title, image, id, year }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img
        className="card-top-img"
        src={
          image && image !== "N/A"
            ? image
            : `${process.env.REACT_APP_HOME_PAGE}/assets/default-movie.jpg`
        }
        onClick={() => navigate("/movie/" + id)}
        alt={title}
      />
      <div className="card-title">{title}</div>
      <small className="ml-auto">{year}</small>
    </div>
  );
};

export default Card;
