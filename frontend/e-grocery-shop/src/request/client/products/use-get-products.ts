import { ProductsDocument, type ProductsQueryVariables } from "@/graphql/queries/product/products.graphql"
import { useGraphQLFetcherClient } from "@/lib/fetcher/client/use-graphql-fetcher-client"
import type { ProductsData } from "@/types"

type GetProductsFromClientParams = {
  variables?: ProductsQueryVariables
}

const useGetProductsFromClient = ({ variables } : GetProductsFromClientParams = {}) => {
  const { 
    loading,
    error,
    data,
    refetch,
    fetchMore,
    networkStatus,
    called,
   } = useGraphQLFetcherClient<ProductsQueryVariables, ProductsData>(ProductsDocument, {
    page: variables?.page ?? 1,
    pageSize: variables?.pageSize ?? 10,
    categories: variables?.categories ?? [],
    search: variables?.search ?? "",
    tags: variables?.tags ?? [],
  })

  return{
    loading,
    error,
    data,
    refetch,
    fetchMore,
    networkStatus,
    called,
    products: data?.products.result.data,
    metadata: {
      totalItems: data?.products.result.totalItems,
      totalPages: data?.products.result.totalPages,
      currentPage: data?.products.result.currentPage,
      pageSize: data?.products.result.pageSize
    },
    status: {
      message: data?.products.message,
      statusCode: data?.products.statusCode
    }
  }
}

export default useGetProductsFromClient