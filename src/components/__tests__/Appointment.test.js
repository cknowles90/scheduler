import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";

beforeEach(cleanup);
afterEach(cleanup);

describe("Appointment", () => {

  xit("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("it does something else", () => {
    // ...
  });

  xit("it does something else", () => {
    // ...
  });
  
});