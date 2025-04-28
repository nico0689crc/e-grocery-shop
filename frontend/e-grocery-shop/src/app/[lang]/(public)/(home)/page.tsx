// Types
import type { ParamsType } from '@/types';

// Utilities
import { getDictionary } from '@/lib/getDictionary';
import getMetadata from '@/request/server/metadata/get-metadata';
import { getProductsFromServer } from '@/request/server/products/get-products';

// Components
import HomeView from '@/components/views/home/HomeView';

// Function to generate metadata for the page
export async function generateMetadata(props: ParamsType) {
  const params = await props.params;
  const metadata = getMetadata('home');

  return metadata[params.lang];
}

// HomePage component
const HomePage = async (props: ParamsType) => {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  const { products } = await getProductsFromServer();

  return <HomeView dictionary={dictionary} lang={params.lang} products={products} />;
};

export default HomePage;
