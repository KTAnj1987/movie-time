import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import SearchResult from "../SearchResult";
import * as ReactRouter from "react-router-dom";
import * as redux from "react-redux";

const mockDispatch = jest.fn();

const DUMMY_MOVIE = {
  imdbID: 1,
  Title: "Home Alone 2",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  Year: "2018",
};

const mockState = {
  query: "young",
  data: [DUMMY_MOVIE],
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
  useSearchParams: () => [
    {
      get: () => "young",
    },
  ],
}));

function MockSearchResult() {
  return (
    <ReactRouter.BrowserRouter>
      <SearchResult />
    </ReactRouter.BrowserRouter>
  );
}

describe("should render Home component", () => {
  it("should match movie detail snapshot", () => {
    const tree = renderer.create(<MockSearchResult />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render image correctly", () => {
    render(<MockSearchResult />);
    const imageElement = screen.getByAltText(DUMMY_MOVIE.Title);
    expect(imageElement).toBeVisible();
    expect(imageElement.getAttribute("src")).toContain(DUMMY_MOVIE.Poster);
  });

  it("render default image correctly", () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ data: [{ ...DUMMY_MOVIE, Poster: "N/A" }] });
    render(<MockSearchResult />);
    const imageElement = screen.getByAltText(DUMMY_MOVIE.Title);
    expect(imageElement).toBeVisible();
    expect(imageElement.getAttribute("src")).toMatch(/default-movie.jpg$/);
  });

  it("render loading state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ isLoading: true, data: [] });
    render(<MockSearchResult />);
    const loadingElement = await screen.findByText("Loading ...");
    expect(loadingElement).toBeVisible();
  });

  it("render error state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ error: "Server Error", data: [] });
    render(<MockSearchResult />);
    const errorElement = await screen.findByText("Server Error");
    expect(errorElement).toBeVisible();
  });

  it("render no movie state correctly", async () => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ data: [] });
    render(<MockSearchResult />);
    const errorElement = await screen.findByText("No data found");
    expect(errorElement).toBeVisible();
  });
});
