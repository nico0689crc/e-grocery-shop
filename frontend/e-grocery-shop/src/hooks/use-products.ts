
import { ProductsQuery, ProductsQueryVariables, useProductsQuery } from "@/graphql/products.graphql";
import { QueryHookOptions } from "@apollo/client";

export const useProducts = (baseOptions?: QueryHookOptions<ProductsQuery, ProductsQueryVariables>) => {
    const {data, refetch, error, loading} = useProductsQuery(baseOptions);

    return {
        data: {
            products: data?.products?.result?.data || [],
            message: data?.products?.message || "",
            status: data?.products?.statusCode || "",
            currentPage: data?.products?.result?.currentPage || 0,
            totalPages: data?.products?.result?.totalPages || 0,
            totalItems: data?.products?.result?.totalItems || 0,
            pageSize: data?.products?.result?.pageSize || 0,
        },
        refetch,
        error,
        loading
    }
}