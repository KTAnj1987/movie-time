import React from "react";
import renderer from "react-test-renderer";
import Home from "../Home";

describe("should render Home component", () => {
  it("shold match home page snapshot", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
