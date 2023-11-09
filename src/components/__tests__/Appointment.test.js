import React from "react";

import { render, cleanup } from "@testing-library/react";
import PropTypes from "prop-types";

import Appointment from "components/Appointment/Appointment";

afterEach(cleanup);

Appointment.propTypes = {
  interview: PropTypes.shape({
    student: PropTypes.string,
    interviewers: PropTypes.array,
  }),
  id: PropTypes.number,
  time: PropTypes.string,
  onAdd: PropTypes.func,
  interviewers: PropTypes.array,
  bookInterview: PropTypes.func,
  cancelInterview: PropTypes.func,
};

// xit("does something it is supposed to do", () => {

// });

describe("Appointment", () => {
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