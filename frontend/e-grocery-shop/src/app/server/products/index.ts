'use server'

// GraphQL Imports
import type { ProductsQueryVariables } from '@/graphql/queries/products/products.graphql'
import { ProductsDocument } from '@/graphql/queries/products/products.graphql'
import { graphQLDataFetcher } from '@/graphql/lib/server/graphql-data-fetcher'

// Types Imports
import type { Product, ProductResult, ProductsData, ProductsResponse } from '@/types/app/product'

// Types for Server Response
type ProductsFromServerResponse = {
  products: Product[]
  metadata: Omit<ProductResult, 'data'>
  status: Omit<ProductsResponse, 'result'>
}

// Function to Fetch Products from Server
export const getProductsFromServer = async (
  variables?: ProductsQueryVariables,
  options?: RequestInit
): Promise<ProductsFromServerResponse> => {
  const response = await graphQLDataFetcher<ProductsQueryVariables, ProductsData>(
    ProductsDocument.loc!.source.body,
    {
      page: variables?.page ?? 1,
      pageSize: variables?.pageSize ?? 5
    },
    options
  )

  if (response.products.statusCode !== 200) {
    throw new Error(`Error in GraphQL query: ${response.products.message}`)
  }

  return {
    products: response.products.result.data,
    metadata: {
      totalItems: response.products.result.totalItems,
      totalPages: response.products.result.totalPages,
      currentPage: response.products.result.currentPage,
      pageSize: response.products.result.pageSize
    },
    status: {
      message: response.products.message,
      statusCode: response.products.statusCode
    }
  }
}
