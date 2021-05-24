import {
  findByText,
  render,
  screen,
} from "../../../test-utils/testing-library";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

// Provider comes by default as a wrapper thanks to the custom render
// import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  // we can add a second argument with an option as a wrapper
  render(<Options optionType="scoops" />);

  // Make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoop to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // Clear the input -- good practice
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoop to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings are checked", async () => {
  render(<Options optionType="toppings" />);

  // Total starts out $0.00
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // add cheeries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // add hotfudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  // uncheck topping and check subtotal
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  // test("grand total starts at $0.00", () => {
  //   render(<OrderEntry />);

  //   const grandTotalText = screen.getByRole("heading", {
  //     name: /grand total: \$/i,
  //   });
  //   expect(grandTotalText).toHaveTextContent("$0.00");
  // });

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // Grand total starts at $0.00
    expect(grandTotalText).toHaveTextContent("$0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    // Add 2 vanilla scoop
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotalText).toHaveTextContent("$4.00");

    // Add cherry topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    // Add cherry topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$1.50");

    // Add 2 vanilla scoop
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotalText).toHaveTextContent("$5.50");
  });

  test("grand total updates if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotalText = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    userEvent.click(cherriesCheckbox);

    expect(grandTotalText).toHaveTextContent("$3.50");
    userEvent.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("$2.00");
  });
});
