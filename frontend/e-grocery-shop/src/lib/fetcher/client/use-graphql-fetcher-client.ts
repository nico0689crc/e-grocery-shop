// GraphQL types
import type { DocumentNode } from "graphql";

// Apollo Client hooks
import { useQuery } from "@apollo/client";

// Apollo Client types
import type { QueryResult, OperationVariables, TypedDocumentNode } from "@apollo/client";

/**
 * GraphQLFetcherClient is a utility function to fetch data using Apollo Client's `useQuery` hook.
 * 
 * @template TVariables - The type of variables for the GraphQL query.
 * @template TQuery - The type of the GraphQL query result.
 * @param query - The GraphQL query document.
 * @param variables - The variables for the GraphQL query.
 * @returns QueryResult<TQuery, TVariables> - The result of the query.
 */
export const useGraphQLFetcherClient = <TVariables extends OperationVariables, TQuery>(
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  variables: TVariables = {} as TVariables,
): QueryResult<TQuery, TVariables> => {
  try {
    return useQuery<TQuery, TVariables>(query, { variables });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";

    throw new Error(`GraphQLFetcherClient failed: ${errorMessage}`);
  }
};
