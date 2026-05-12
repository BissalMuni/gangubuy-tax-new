export type { Basket } from "./types";

import { taxBasket } from "./tax";
import { luxHvyBasket } from "./lux-hvy";
import type { Basket } from "./types";

/** 모든 바구니 */
export const allBaskets: Basket[] = [taxBasket, luxHvyBasket];

/** ID로 바구니 찾기 */
export function getBasketById(id: string): Basket | undefined {
  return allBaskets.find((b) => b.id === id);
}

/** 특정 책이 속한 바구니 목록 */
export function getBasketsForBook(bookId: string): Basket[] {
  return allBaskets.filter((b) => b.bookIds.includes(bookId));
}
