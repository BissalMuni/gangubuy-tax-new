import type { Basket } from './types';
import { taxBasket } from './tax';

export type { Basket } from './types';
export { taxBasket } from './tax';

/** 모든 바구니 — 사이드바 그룹 순서대로 */
export const allBaskets: Basket[] = [taxBasket];

/** 바구니 ID로 조회 */
export function getBasketById(id: string): Basket | undefined {
  return allBaskets.find((b) => b.id === id);
}

/** 책 ID가 속한 바구니들 (한 책이 여러 바구니에 속할 수 있음) */
export function getBasketsForBook(bookId: string): Basket[] {
  return allBaskets.filter((b) => b.bookIds.includes(bookId));
}
