import { screen, render, waitFor } from "../../../test-utils/testing-library";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

describe("<OrderEntry />", () => {
  // You can write test.only to make ONLY the flagged test run
  test("handles errors for scoops and topping routes", async () => {
    // Overwrite handlers, we need to trigger some errors
    server.resetHandlers([
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      ),
    ]);

    // jest.fn() is a way to MOCK FN -- IT DOESN'T DO ANYTHING
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // We need to use the waitFor method because it'd only succeed for only 1 call, instead of 2 since it's async
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  // test.only("No scoop subtotal update for invalid scoop count", async () => {
  //   const component = render(<OrderEntry setOrderPhase={jest.fn()} />);

  //   const chocolateScoopInput = await screen.findByRole("spinbutton", {
  //     name: "Chocolate",
  //   });
  //   const grandTotal = screen.getByRole("heading", {
  //     name: /grand total: \$/i,
  //   });

  //   userEvent.clear(chocolateScoopInput);
  //   userEvent.type(chocolateScoopInput, "-2");

  //   expect(grandTotal).toHaveTextContent("$0.00");

  //   userEvent.clear(chocolateScoopInput);
  //   userEvent.type(chocolateScoopInput, "1.5");

  //   expect(grandTotal).toHaveTextContent("$0.00");

  //   userEvent.clear(chocolateScoopInput);
  //   userEvent.type(chocolateScoopInput, "20");

  //   expect(grandTotal).toHaveTextContent("$0.00");

  //   userEvent.clear(chocolateScoopInput);
  //   userEvent.type(chocolateScoopInput, "2");

  //   expect(grandTotal).toHaveTextContent("$4.00");
  // });
});
