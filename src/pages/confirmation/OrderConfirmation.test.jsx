import { render, screen } from "../../test-utils/testing-library";
import { server } from "../../mocks/server";
import { rest } from "msw";
import OrderConfirmation from "./OrderConfirmation";

test("Trigger and error and see if error if shown", async () => {
  server.resetHandlers([
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    ),
  ]);

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toBeInTheDocument();
});
