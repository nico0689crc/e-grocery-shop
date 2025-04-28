'use server'

// Types Imports
import type { ProductQueryVariables } from '@/graphql/queries/product/product.graphql'
import type { ProductData, Product } from '@/types'

// GraphQL Imports
import { ProductDocument } from '@/graphql/queries/product/product.graphql'

// Utility Imports
import { GraphQLFetcherServer } from '@/lib/fetcher/server/graphql-fetcher-server'

type GetProductsFromServerParams = {
  variables: ProductQueryVariables
  options?: RequestInit
}

// Function to Fetch Products from Server
export const getProductFromServer = async ({
  variables,
  options
}: GetProductsFromServerParams): Promise<Product> => {
  try {
    const { product } = await GraphQLFetcherServer<ProductQueryVariables, ProductData>(
      ProductDocument,
      {
        slug: variables?.slug
      },
      {
        cache: 'force-cache',
        next: {
          revalidate: 60 * 60 * 24 // 1 day
        },
        ...options
      }
    )

    return product
  } catch (error) {
    console.error('Error fetching product from server:', error)
    throw new Error('Failed to fetch products from server')
  }
}
