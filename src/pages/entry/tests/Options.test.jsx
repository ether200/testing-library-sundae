import { render, screen } from "../../../test-utils/testing-library";

// Provider comes by default as a wrapper thanks to the custom render
// import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

import Options from "../Options";

describe("<Options />", () => {
  test("displays image for each scoop option from server", async () => {
    // Mock Service Worker will return three scoop from server
    render(<Options optionType="scoops" />);

    // Find images
    // Always use findBy when dealing with async test
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // Confirm alt text of images
    const altText = scoopImages.map((image) => image.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("displays image for each topping option from server", async () => {
    // Mock Service Worker will return three toppings from server
    render(<Options optionType="toppings" />);

    // Find images
    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    // Confirm alt text of images
    const altText = toppingImages.map((image) => image.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot Fudge topping",
    ]);
  });
});
