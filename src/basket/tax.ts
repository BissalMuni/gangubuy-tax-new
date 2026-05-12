import type { Basket } from "./types";

export const taxBasket: Basket = {
  id: "tax",
  title: "지방세",
  bookIds: ["acquisition", "corp-acquisition-tax", "property", "vehicle"],
};
