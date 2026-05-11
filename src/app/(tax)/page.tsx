import Link from 'next/link';
import { allBooks, getFirstLeafPath } from '@/book';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">G-TaxWiki</h1>
      <p className="text-gray-500 mb-8">
        지방세 정보 안내 사이트입니다. 좌측 메뉴에서 세목을 선택하세요.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allBooks.map((book) => {
          const firstLeaf = getFirstLeafPath(book.children);
          const href = firstLeaf.length > 0
            ? `/${book.basePath}/${firstLeaf.join("/")}`
            : `/${book.basePath}`;
          return (
            <Link
              key={book.id}
              href={href}
              className="block rounded-lg border border-gray-200 p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <span className="text-3xl">📖</span>
              <h2 className="text-lg font-semibold mt-3">{book.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{book.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
