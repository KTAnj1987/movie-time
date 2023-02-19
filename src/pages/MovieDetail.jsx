import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMovieById } from "../reducer/slices/movieSlice";
import "../styles/MovieDetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  const {
    selectedMovie: movie,
    error,
    isLoading,
    query,
  } = useSelector((state) => state.movies);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!movie) {
    return <h1 className={error && "error"}>{error || "No data found"}</h1>;
  }

  return (
    <>
      {query && (
        <Link className="back-link" to={`/search?query=${query}`}>
          Back to Search Result
        </Link>
      )}
      <div className="row movie-details">
        <div className="col">
          <img
            alt={movie.Title}
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : `${process.env.REACT_APP_HOME_PAGE}/assets/default-movie.jpg`
            }
          />
        </div>
        <div className="d-flex flex-column details-col">
          <h1 className="ml-2">{movie.Title}</h1>
          <small className="ml-2">{movie.Plot}</small>
          <div className="d-flex movie-rating">
            <strong>IMDB Rating</strong>
            <span className="ml-2">{movie.imdbRating}</span>
            <strong className="ml-auto">{`${movie.imdbVotes} Votes`} </strong>
          </div>
          <div className="movie-detail-section">
            <div className="row">
              <strong className="title">Country:</strong>
              <span>{movie.Country}</span>
            </div>
            <div className="row">
              <strong className="title">Released:</strong>
              <span>{movie.Released}</span>
            </div>
            <div className="row">
              <strong className="title">Genre:</strong>
              <span>{movie.Genre}</span>
            </div>
            <div className="row">
              <strong className="title">Director:</strong>
              <span>{movie.Director}</span>
            </div>
            <div className="row">
              <strong className="title">Actors:</strong>
              <span>{movie.Actors}</span>
            </div>
            <div className="row">
              <strong className="title">Awards:</strong>
              <span>{movie.Awards}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
