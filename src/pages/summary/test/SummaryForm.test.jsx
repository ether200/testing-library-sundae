import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("<SummaryForm />", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /confirm order/i });
    // Test if checkbox is unchecked
    expect(checkbox).not.toBeChecked();
    // Test if the checkbox is unchecked, the button will be disabled
    expect(submitButton).toBeDisabled();
  });

  test("Checkbox enables button on first click and disables on second click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /confirm order/i });

    userEvent.click(checkbox);
    expect(submitButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(submitButton).toBeDisabled();
  });

  test("Popover responds to hover", async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upen mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    // we use waitforelementtoberemoved because this action is asynchronous
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
