import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";
import { BrowserRouter } from "react-router-dom";

import * as reactRouter from "react-router";

const navigate = jest.fn();

const DUMMY_MOVIE = {
  id: 1,
  title: "Home Alone 2",
  image:
    "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  year: "2018",
};

function MockCard(movie) {
  return (
    <BrowserRouter>
      <Card {...movie} />
    </BrowserRouter>
  );
}

describe("should render card item component", () => {
  it("render image correctly", () => {
    render(<MockCard {...DUMMY_MOVIE} />);
    const linkElement = screen.getByRole("img");
    expect(linkElement).toBeVisible();
    expect(linkElement.getAttribute("src")).toContain(DUMMY_MOVIE.image);
  });

  it("render default image correctly", () => {
    render(<MockCard {...{ ...DUMMY_MOVIE, image: "N/A" }} />);
    const linkElement = screen.getByRole("img");
    expect(linkElement).toBeVisible();
    expect(linkElement.getAttribute("src")).toMatch(/default-movie.jpg$/);
  });

  it("render name correctly", () => {
    render(<MockCard {...DUMMY_MOVIE} />);
    const nameElement = screen.getByText(DUMMY_MOVIE.title);
    expect(nameElement).toBeVisible();
  });
});

describe("should work card item component", () => {
  it("click image should navigate properly", () => {
    jest.spyOn(reactRouter, "useNavigate").mockImplementation(() => navigate);
    render(<MockCard {...DUMMY_MOVIE} />);
    const linkElement = screen.getByRole("img");
    expect(linkElement).toBeVisible();
    fireEvent.click(linkElement);
    expect(navigate).toHaveBeenCalledWith("/movie/" + DUMMY_MOVIE.id);
  });
});
