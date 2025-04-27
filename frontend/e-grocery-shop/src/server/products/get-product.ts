'use server'

// Types Imports
import type { ProductQueryVariables } from '@/graphql/queries/product/product.graphql'
import type { ProductFromServerResponse, ProductData } from '@/types'

// GraphQL Imports
import { ProductDocument } from '@/graphql/queries/product/product.graphql'

// Utility Imports
import { GraphQLFetcherServer } from '@/lib/fetcher/graphql-fetcher-server'

type GetProductsFromServerParams = {
  variables: ProductQueryVariables
  options?: RequestInit
}

// Function to Fetch Products from Server
export const getProductFromServer = async ({
  variables,
  options
}: GetProductsFromServerParams): Promise<ProductFromServerResponse> => {
  const response = await GraphQLFetcherServer<ProductQueryVariables, ProductData>(
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
