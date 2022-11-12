import { screen, render } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard should be working correctly", () => {
  beforeEach(() => {
    render(<Dashboard />);
  });
  test("Todo text should be present", () => {
    const text = screen.getByText("Todo App");
    expect(text).toBeInTheDocument();
  });
  // it("Input should be present", () => {
  //   // const ip =
  //   expect(screen.getByTestId("todo-input")).toBeInTheDocument();
  // });
  // it("{should}", () => {
  //   //Arrange
  //   //Act
  //   //Assert
  // });
});
