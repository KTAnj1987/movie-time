import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducer/store.js";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const fetchResponse = {
  Response: "True",
  Search: [
    {
      imdbID: 1,
      Title: "Home Alone 2",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDI1MzM0Y2YtYmIyMS00ODE3LTlhZjEtZTUyNmEzMTNhZWU5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      Year: "2018",
      Plot: "One year after Kevin McCallister was left home alone and had to defeat a pair of bumbling burglars, he accidentally finds himself stranded in New York City - and the same criminals are not far behind.",
      imdbRating: "6",
      imdbVotes: "3,333",
    },
  ],
  totalResults: 1,
};

jest.mock("./api", () => ({
  ...jest.requireActual("./api"),
  getMoviesByQuery: () => fetchResponse,
  getMovieById: () => ({ ...fetchResponse.Search[0], Response: "True" }),
}));

function MockApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe("should search functinality work properly", () => {
  it("when type on search input and click enter , it should dispatch event", async () => {
    act(() => {
      render(<MockApp />);
    });
    const user = userEvent.setup();

    const searchInputElement = await screen.findByTestId("search");
    await user.type(searchInputElement, "young");
    await user.keyboard("{enter}");

    // navigate to search result page
    const searchResultElement = await screen.findByTestId("searched-text");
    expect(searchResultElement).toBeVisible();
    expect(searchResultElement.textContent).toMatch(/young/);

    const imageElement = await screen.findByAltText(
      fetchResponse.Search[0].Title
    );
    expect(imageElement).toBeVisible();
    expect(imageElement.getAttribute("src")).toContain(
      fetchResponse.Search[0].Poster
    );

    // navigate to detail page
    await user.click(imageElement);

    const linkElement = await screen.findByText("Back to Search Result");
    expect(linkElement).toBeVisible();
    const image = await screen.findByAltText(fetchResponse.Search[0].Title);
    expect(image).toBeVisible();
    expect(image.getAttribute("src")).toContain(fetchResponse.Search[0].Poster);
  });
});
