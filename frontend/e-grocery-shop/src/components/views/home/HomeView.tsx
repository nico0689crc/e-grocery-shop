import Link from "next/link";

import type { DictionaryType, LangParamType, Product } from "@/types";
import { getLocalizedUrl } from "@/lib/i18n";

type HomeViewProps = DictionaryType & LangParamType & {
  products: Product[]
}

const HomeView = ({ products, lang }: HomeViewProps) => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <h1 className="text-4xl font-bold">Home</h1>
    <p className="mt-4 text-lg">Welcome to the Home View!</p>
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Products</h2>
      <ul className="mt-2">
        {products.map((product) => (
          <li key={product.id} className="py-2">
            <Link href={getLocalizedUrl(`/product/${product.slug}`, lang)}>
              {product.title} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default HomeView;
