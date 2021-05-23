import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

// custom render method with a default wrapper

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
