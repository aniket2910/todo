import {
  render,
  waitFor,
  getByText,
  screen,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import Dashboard from "../Components/Dashboard/Dashboard";

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("http://localhost:8080/todos", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json([
        {
          id: 3,
          todo: "Testing Task",
          status: false,
        },
        {
          id: 19,
          todo: "Testing Task Added",
          status: false,
        },
      ])
    );
  }),
  rest.post("http://localhost:8080/todos", (req, res, ctx) => {
    // respond using a mocked JSON body
    const todo = {
      id: 19,
      todo: "Testing Task Added",
      status: false,
    };
    return res(
      ctx.set("Content-Type", "application/json"),
      ctx.body(JSON.stringify(todo)),
      ctx.json({
        status: 201,
        msg: "Successfully Created",
      })
    );
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe("Dashboard Component", () => {
  it("should render data", async () => {
    render(<Dashboard />);
    await waitFor(() => {
      const data = screen.getByText("Testing Task");
      expect(data).toBeDefined();
    });
  });
});

it("should  submit form", async () => {
  //Arrange
  render(<Dashboard />);
  let inputBox = screen.getByTestId("todo");
  // let todoForm = screen.getByTestId("todo_form");
  let submitBtn = screen.getByTestId("submit");
  //Act
  fireEvent.change(inputBox, { target: { value: "Testing Task Added" } });
  userEvent.click(submitBtn);

  // Arrange
  await waitFor(() => {
    const task = screen.getByText("Testing Task Added");
    expect(task).toBeInTheDocument();
  });
});
