// Types
import type { ParamsType } from '@/types';

// Utilities
import getMetadata from '@/request/server/metadata/get-metadata';
import { getDictionary } from '@/lib/getDictionary';
import { getProductFromServer } from '@/request/server/products/get-product';

// Components
import ProductView from '@/components/views/product/ProductView';

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

  const product = await getProductFromServer({
    variables: {
      slug: params.slug,
    }
  });

  return <ProductView product={product} />;
};

export default ProductPage;
