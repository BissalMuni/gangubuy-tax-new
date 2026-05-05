/** kebab-case → camelCase ("corp-acquisition-tax" → "corpAcquisitionTax") */
export function toCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/** kebab-case → PascalCase ("corp-acquisition-tax" → "CorpAcquisitionTax") */
export function toPascalCase(kebab: string): string {
  const camel = toCamelCase(kebab);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/** src/lib/basket/{id}.ts — 바구니 정의 */
export function genBasketFile(id: string, title: string, bookIds: string[]): string {
  const camel = toCamelCase(id);
  const bookIdsStr = bookIds.map((b) => `"${b}"`).join(", ");
  return `import type { Basket } from "./types";

export const ${camel}Basket: Basket = {
  id: "${id}",
  title: "${title}",
  bookIds: [${bookIdsStr}],
};
`;
}

/** src/lib/basket/index.ts — 전체 재생성 */
export function genBasketIndex(baskets: { id: string }[]): string {
  const imports = baskets.map((b) => {
    const camel = toCamelCase(b.id);
    return `import { ${camel}Basket } from "./${b.id}";`;
  });

  const allBasketsArray = baskets
    .map((b) => `${toCamelCase(b.id)}Basket`)
    .join(", ");

  return `export type { Basket } from "./types";

${imports.join("\n")}
import type { Basket } from "./types";

/** 모든 바구니 */
export const allBaskets: Basket[] = [${allBasketsArray}];

/** ID로 바구니 찾기 */
export function getBasketById(id: string): Basket | undefined {
  return allBaskets.find((b) => b.id === id);
}

/** 특정 책이 속한 바구니 목록 */
export function getBasketsForBook(bookId: string): Basket[] {
  return allBaskets.filter((b) => b.bookIds.includes(bookId));
}
`;
}
