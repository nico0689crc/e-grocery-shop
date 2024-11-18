// import { useProducts } from "@/hooks/useProducts";

import { getClient } from "@/graphql/lib/client";
import { Product, ProductsDocument } from "@/graphql/products.graphql";

export default async function Home() {
  // const { data: { products }, loading, error } = useProducts({variables: {page: 1, pageSize: 15}});

  const client = getClient();

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (error) {
  //   return <h1>Error</h1>;
  // }

  const { data: { products: { result : { data: products }} } } = await client.query({
    query: ProductsDocument,
  });

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
