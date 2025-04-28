'use client';

import useGetProductsFromClient from "@/request/client/products/use-get-products";
import Image from "next/image";

function ProductsPage() {
  const { loading, error, data } = useGetProductsFromClient();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.products) return <p>No products found</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-lg">Welcome to the Products Page!</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <ul className="mt-2">
          {/* Render product list here */}
          {data.products.result.data.map((product) => (
            <li key={product.id} className="mb-2">
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p className="text-lg font-semibold">${product.price}</p>
              <Image 
                src={product.attachments[0].thumbnail} 
                alt={product.title} 
                className="w-32 h-32 object-cover"
                width={128}
                height={128} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default ProductsPage;
