import { screen, render } from "../../../test-utils/testing-library";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test.only("Check if input has class of invalid", () => {
  render(
    <ScoopOption
      name="Chocolate"
      imagePath="/images/chocolate.png"
      updateItemCount={jest.fn()}
    />
  );
  const chocolateScoopInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  // Check if the input has is-invalid class when typing a negative number
  userEvent.type(chocolateScoopInput, "-1");
  expect(chocolateScoopInput).toHaveClass("is-invalid");

  // Value is decimal
  userEvent.clear(chocolateScoopInput);
  userEvent.type(chocolateScoopInput, "1.5");
  expect(chocolateScoopInput).toHaveClass("is-invalid");

  // Value is over 10
  userEvent.clear(chocolateScoopInput);
  userEvent.type(chocolateScoopInput, "20");
  expect(chocolateScoopInput).toHaveClass("is-invalid");

  // Check if the input DOES NOT have is invalid class
  userEvent.clear(chocolateScoopInput);
  userEvent.type(chocolateScoopInput, "3");
  expect(chocolateScoopInput).not.toHaveClass("is-invalid");
});
