import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import InputBox from "../Components/InputBox/InputBox";
// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import Dashboard from "../Components/Dashboard/Dashboard";

// declare which API requests to mock
const server = setupServer();
// capture "GET /greeting" requests

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe("Todo Input Form", () => {
  let form;
  const handleAdd = jest.fn();
  beforeEach(() => {
    form = render(<InputBox handleAdd={handleAdd} />);
  });

  it("Should render correctly", () => {
    //Arrage
    let form = screen.getByTestId("todo_form");
    // Act
    // Assert
    expect(form).toBeInTheDocument();
  });

  it("should input accept text", () => {
    //Arrange
    let inputBox = screen.getByTestId("todo");
    //Act
    fireEvent.change(inputBox, { target: { value: "Task 1" } });
    //Assert
    expect(inputBox).toHaveValue("Task 1");
  });
});
