import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card.jsx";
import { fetchMovies } from "../reducer/slices/movieSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const {
    data: movies,
    page,
    hasNextPage,
    error,
    isLoading,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ page, query }));
  }, [query]);

  const fetchNextPage = useCallback(
    () => dispatch(fetchMovies({ page, query })),
    [page, query]
  );

  if (movies.length === 0 && isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (movies.length === 0 && error) {
    return (
      <>
        <h2>Search results for &quot;{query}&quot;</h2>
        <h1 className="error">{error || "No data found"}</h1>
      </>
    );
  }

  return (
    <InfiniteScroll
      dataLength={movies.length || 0}
      next={fetchNextPage}
      loader={<h4>Loading ...</h4>}
      hasMore={hasNextPage}
    >
      <h2>Search results for &quot;{query}&quot;</h2>
      <div className="row">
        {movies &&
          movies.map((movie) => (
            <div className="col" key={`movie-${movie.imdbID}`}>
              <Card
                title={movie.Title}
                image={movie.Poster}
                id={movie.imdbID}
                year={movie.Year}
              />
            </div>
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default SearchResult;
