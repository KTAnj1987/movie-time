const BASE_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const getMoviesByQuery = async (page, query) => {
  const res = await fetch(
    `${BASE_URL}?type=movie&apikey=${API_KEY}&page=${page}&s=${query}`
  );
  return await res.json();
};

export const getMovieById = async (id) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return await res.json();
};
