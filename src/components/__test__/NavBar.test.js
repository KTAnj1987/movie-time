import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { BrowserRouter } from "react-router-dom";
import * as reactRouter from "react-router";

const mockDispatch = jest.fn();
const navigate = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

function MockNavBar() {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
}

describe("should render nav bar component", () => {
  it("render brand name correctly", () => {
    render(<MockNavBar />);
    const brandNameElement = screen.getByText("Movie Time");
    expect(brandNameElement).toBeVisible();
  });

  it("render brand image correctly", () => {
    render(<MockNavBar />);
    const brandImageElement = screen.getByAltText("brand-logo");
    expect(brandImageElement).toBeVisible();
    expect(brandImageElement.getAttribute("src")).toMatch(/logo.png$/);
  });

  it("render search input correctly", () => {
    render(<MockNavBar />);
    const searchInputElement = screen.getByTestId("search");
    expect(searchInputElement).toBeVisible();
  });
});

describe("search input should work properly", () => {
  it("when clicking enter without search text , it should not dispatch event", () => {
    render(<MockNavBar />);
    const searchInputElement = screen.getByTestId("search");
    fireEvent.change(searchInputElement, { target: { value: "" } });
    fireEvent.keyDown(searchInputElement, { key: "Enter" });

    expect(mockDispatch).not.toBeCalled();
  });

  it("when type on search input and click enter , it should dispatch event", () => {
    jest.spyOn(reactRouter, "useNavigate").mockImplementation(() => navigate);
    render(<MockNavBar />);
    const searchInputElement = screen.getByTestId("search");
    fireEvent.change(searchInputElement, { target: { value: "young" } });
    fireEvent.keyDown(searchInputElement, { key: "Enter" });

    expect(mockDispatch).toBeCalledWith({
      payload: "young",
      type: "movies/setQuery",
    });
    expect(navigate).toHaveBeenCalledWith("search?query=young");
  });
});
