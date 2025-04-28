import type { Product } from "@/types";

type ProductViewProps = {
  product: Product
}

const ProductView = ({ product }: ProductViewProps) => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <h1 className="text-4xl font-bold">{product.title}</h1>
    <p className="mt-4 text-lg">Price: ${product.price}</p>
    <p className="mt-4 text-lg">{product.description}</p>
  </div>
);

export default ProductView;
