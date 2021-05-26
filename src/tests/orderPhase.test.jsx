import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const chocolateScoopInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const cherriesToppingsCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(chocolateScoopInput);
  userEvent.type(chocolateScoopInput, "2");
  userEvent.click(cherriesToppingsCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsSummaryInfo = screen.getByRole("heading", {
    name: "Scoops: $4.00",
    exact: false,
  });
  const toppingsSummaryInfo = screen.getByRole("heading", {
    name: "Toppings: $1.50",
    exact: false,
  });
  expect(scoopsSummaryInfo).toHaveTextContent("4.00");
  expect(toppingsSummaryInfo).toHaveTextContent("1.50");

  // accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  userEvent.click(termsAndConditions);
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toBeInTheDocument();

  // click new order on confirmation page
  const createNewOrderButton = await screen.findByRole("button", {
    name: "Create new order",
  });
  userEvent.click(createNewOrderButton);

  await waitFor(async () => {
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesToppingsCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(chocolateScoopInput).toHaveValue(0);
    expect(cherriesToppingsCheckbox).not.toBeChecked();
  });

  // check that scoops and toppings subtotal has been reset
  // expect(chocolateScoopInput).toHaveTextContent("0");
  // expect(cherriesToppingsCheckbox).not.toBeChecked();
});
