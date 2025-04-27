'use server'

// GraphQL Imports
import type { ProductQueryVariables } from '@/graphql/queries/products/product.graphql'
import { ProductDocument } from '@/graphql/queries/products/product.graphql'
import { graphQLDataFetcher } from '@/graphql/lib/server/graphql-data-fetcher'

// Types Imports
import type { Product, ProductData } from '@/types/app/product'

// Types for Server Response
type ProductFromServerResponse = {
  product: Product
}

type GetProductsFromServerParams = {
  variables: ProductQueryVariables
  options?: RequestInit
}

// Function to Fetch Products from Server
export const getProductFromServer = async ({
  variables,
  options
}: GetProductsFromServerParams): Promise<ProductFromServerResponse> => {
  const response = await graphQLDataFetcher<ProductQueryVariables, ProductData>(
    ProductDocument.loc!.source.body,
    {
      productId: variables?.productId
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 24 // 1 day
      },
      ...options
    }
  )

  return {
    product: response.product
  }
}
