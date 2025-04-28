import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import type { Product } from "@/types";

type HomeViewProps ={
  products: Product[]
}

const HomeView = async ({ products }: HomeViewProps) => {
  const t = await getTranslations('pages.home');

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <Link href="/products" locale="en">About</Link>
      <p className="mt-4 text-lg">Welcome to the Home View!</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <ul className="mt-2">
          {products.map((product) => (
            <li key={product.id} className="py-2">
              <Link href={`/products/${product.slug}`}>
                {product.title} - ${product.price}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default HomeView;
