import React from "react";

import { render, cleanup } from "@testing-library/react";
import PropTypes from "prop-types";

import Application from "components/Application";

afterEach(cleanup);


// it("renders without crashing", () => {
//   render(<Application />);
// });


describe("Appointment", () {
  it("renders without crashing", () => {
    render(<Application />);
  });

  // it("it does something", () => {
  // });

  // it("it does something", () => {
  // });

  // it("it does something", () => {
  // });

  // it("it does something", () => {
  // });
});