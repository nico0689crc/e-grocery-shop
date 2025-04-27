import Link from "next/link";

import type { DictionaryType, LangParamType, Product } from "@/types";
import { getLocalizedUrl } from "@/lib/i18n";

type ProductViewProps = DictionaryType & LangParamType & {
  product: Product
}

const ProductView = ({ product, lang }: ProductViewProps) => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <h1 className="text-4xl font-bold">{product.title}</h1>
    <p className="mt-4 text-lg">Price: ${product.price}</p>
    <p className="mt-4 text-lg">{product.description}</p>
    <Link href={getLocalizedUrl(`/`, lang)} className="mt-4 text-blue-500">
      Back to Products
    </Link>
  </div>
);

export default ProductView;
