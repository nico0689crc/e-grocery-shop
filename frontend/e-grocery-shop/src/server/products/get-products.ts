'use server'

// Types Imports
import type { ProductsQueryVariables } from '@/graphql/queries/product/products.graphql'
import type { ProductsData, ProductsFromServerResponse } from '@/types'

// GraphQL Imports
import { ProductsDocument } from '@/graphql/queries/product/products.graphql'

// Utility Imports
import { GraphQLFetcherServer } from '@/lib/fetcher/graphql-fetcher-server'

type GetProductsFromServerParams = {
  variables?: ProductsQueryVariables
  options?: RequestInit
}

// Function to Fetch Products from Server
export const getProductsFromServer = async ({
  variables,
  options
}: GetProductsFromServerParams = {}): Promise<ProductsFromServerResponse> => {
  const { data: { products: response } } = await GraphQLFetcherServer<ProductsQueryVariables, ProductsData>(
    ProductsDocument.loc!.source.body,
    {
      page: variables?.page ?? 1,
      pageSize: variables?.pageSize ?? 5
    },
    {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 24 // 1 day
      },
      ...options
    }
  )
  
  if (response.statusCode !== 200) {
    throw new Error(`Error in GraphQL query: ${response.message}`)
  }

  return {
    products: response.result.data,
    metadata: {
      totalItems: response.result.totalItems,
      totalPages: response.result.totalPages,
      currentPage: response.result.currentPage,
      pageSize: response.result.pageSize
    },
    status: {
      message: response.message,
      statusCode: response.statusCode
    }
  }
}
