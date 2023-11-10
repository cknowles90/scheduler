import React from "react";

import axios from "__mocks__/axios";

import { 
  render, 
  cleanup, 
  fireEvent, 
  getByText, 
  getAllByAltText, 
  getAllByTestId,
  prettyDOM, 
  getByPlaceholderText, 
  getByAltText, 
  queryByAltText, 
  queryByText, 
  waitForElement 
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);
  
  //   return waitForElement(() => getByText("Monday")).then(() => {
  //     fireEvent.click(getByText("Tuesday"));
  
  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });
  // });
  
  // ASYNC version of the ^Above code;
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const {getByText, waitForElement } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
      
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByAltText(container, "Archie Cohen");
    const appointment = appointments[0];
  
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getAllByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")),toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    console.log(prettyDOM(appointment));
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) => 
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancles an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByPlaceholderText(appointment, "Are you sure you want to delete your booking?")).toBeInTheDocument();

    // 5. Click the "Confirm" button the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")),toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed..
    await waitForElement(() => getAllByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => 
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. We want to start by finding an existing interview.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. With the existing interview we want to find the edit button.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4. We change the name and save the interview.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    // 5. We don't want the spots to change for "Monday", since this is an edit.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 6. Read the errors because sometimes they say that await cannot be outside of an async function.
    await waitForElement(() => getByText(container, "Sylvia Palmer"));
    expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {

  });

  xit("changes the schedule when a new day is selected", async () => {
    
    /* Can only use await inside of an async function */
    async function run() {
      console.log("1. The calm before async");
      
      try {
        const data = await setTimeoutPromise();
        
        console.log(`3. Promise Resolved with ${data}`);
      } catch (error) {
        /* A thrown error will be caught by the try/catch */
        console.log(`3. Promise Rejected with ${error}`);
      };
    };
    
    // /* We want to halt execution of this function until this Promise is resolved */
    // const data = await setTimeoutPromise();
    
    // /* The resolved behaves like a return value when we use await */
    // console.log(`Promise Resolved with ${data}`);
    // }
    
    /* We can invoke the async function like any other */
    run().then(() => {
      console.log("4. Use Promises at the top level");
    });
    /* This prints immediately after run() is called */
    console.log("2. Careful, this prints before the timout is complete");
    /*
    1. The calm before async
    2. Careful, this prints before completing the timeout
    3. Promise Resolved with Resolved Data
    4. Use Promises at the top level
    */
  });
});


// function setTimeoutPromise(error) {
//   /* Wrapping a function that takes a callback with a Promise */
//   return new Promise((resolve, reject) => {
//     if (error) {
//       /* When an error occurs we reject the Promise */
//       reject("Error");
//     } else {
//       /* This Promise will resolve in 1000ms */
//       setTimeout(() => resolve("Data"), 1000);
//     }
//   });
// }

// setTimeoutPromise(true /* or false */)
// .then(data => {
//   /* Success case */
//   console.log(`Promise Resolved with ${data}`);
// })
// .catch(error => {
//   /* Failure case */
//   console.log(`Promise Rejected with ${error}`);
// });
