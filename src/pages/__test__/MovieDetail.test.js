import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import MovieDetail from "../MovieDetail";
import * as ReactRouter from "react-router-dom";
import * as redux from "react-redux";

const mockDispatch = jest.fn();

const DUMMY_MOVIE = {
  id: 1,
  Title: "Home Alone 2",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  year: "2018",
  Plot: "One year after Kevin McCallister was left home alone and had to defeat a pair of bumbling burglars, he accidentally finds himself stranded in New York City - and the same criminals are not far behind.",
  imdbRating: "6",
  imdbVotes: "3,333",
};

const mockState = {
  query: "young",
  selectedMovie: DUMMY_MOVIE,
  error: null,
  isLoading: false,
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: () => mockState,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

function MockMovieDetail() {
  return (
    <ReactRouter.BrowserRouter>
      <MovieDetail />
    </ReactRouter.BrowserRouter>
  );
}

describe("should render Home component", () => {
  it("shold match movie detail snapshot", () => {
    const tree = renderer.create(<MockMovieDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render back to search result link", () => {
    render(<MockMovieDetail />);
    const linkElement = screen.getByText("Back to Search Result");
    expect(linkElement).toBeVisible();
  });

  it("render image correctly", () => {
    render(<MockMovieDetail />);
    const imageElement = screen.getByAltText(DUMMY_MOVIE.Title);
    expect(imageElement).toBeVisible();
    expect(imageElement.getAttribute("src")).toContain(DUMMY_MOVIE.Poster);
  });

  it("render default image correctly", () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ selectedMovie: { ...DUMMY_MOVIE, Poster: "N/A" } });
    render(<MockMovieDetail />);
    const imageElement = screen.getByAltText(DUMMY_MOVIE.Title);
    expect(imageElement).toBeVisible();
    expect(imageElement.getAttribute("src")).toMatch(/default-movie.jpg$/);
  });

  it("render loading state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ isLoading: true });
    render(<MockMovieDetail />);
    const loadingElement = await screen.findByText("Loading ...");
    expect(loadingElement).toBeVisible();
  });

  it("render error state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ error: "Server Error" });
    render(<MockMovieDetail />);
    const errorElement = await screen.findByText("Server Error");
    expect(errorElement).toBeVisible();
  });

  it("render no movie state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({});
    render(<MockMovieDetail />);
    const errorElement = await screen.findByText("No data found");
    expect(errorElement).toBeVisible();
  });
});
