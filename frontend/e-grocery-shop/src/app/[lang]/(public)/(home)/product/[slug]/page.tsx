// Types
import type { ParamsType } from '@/types';

// Utilities
import { getDictionary } from '@/lib/getDictionary';
import getMetadata from '@/server/metadata/get-metadata';
import { getProductsFromServer } from '@/server/products/get-products';

// Components
import HomeView from '@/components/views/home/HomeView';

// Function to generate metadata for the page
export async function generateMetadata(props: ParamsType) {
  const params = await props.params;
  const metadata = getMetadata('home');

  return metadata[params.lang];
}

type ProductPageProps = ParamsType<{
  slug: string;
}>

// HomePage component
const ProductPage = async (props: ProductPageProps) => {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const { products } = await getProductsFromServer();

  return <HomeView dictionary={dictionary} lang={params.lang} products={products} />;
};

export default ProductPage;
