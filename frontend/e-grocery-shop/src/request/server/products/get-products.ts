'use server'

// Types Imports
import type { ProductsQueryVariables } from '@/graphql/queries/product/products.graphql'
import type { ProductsData, ProductsFromServerResponse } from '@/types'

// GraphQL Imports
import { ProductsDocument } from '@/graphql/queries/product/products.graphql'

// Utility Imports
import { GraphQLFetcherServer } from '@/lib/fetcher/server/graphql-fetcher-server'

type GetProductsFromServerParams = {
  variables?: ProductsQueryVariables
  options?: RequestInit
}

// Function to Fetch Products from Server
export const getProductsFromServer = async ({
  variables,
  options
}: GetProductsFromServerParams = {}): Promise<ProductsFromServerResponse> => {
  try {
    const data = await GraphQLFetcherServer<ProductsQueryVariables, ProductsData>(
      ProductsDocument,
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

    return {
      products: data.products.result.data,
      metadata: {
        totalItems: data.products.result.totalItems,
        totalPages: data.products.result.totalPages,
        currentPage: data.products.result.currentPage,
        pageSize: data.products.result.pageSize
      },
      status: {
        message: data.products.message,
        statusCode: data.products.statusCode
      }
    }
  } catch (error) {
    console.error('Error fetching products from server:', error)
    throw new Error('Failed to fetch products from server')
  }
}
