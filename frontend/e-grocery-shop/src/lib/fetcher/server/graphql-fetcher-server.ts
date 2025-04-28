'use server'

// Import interno
import { getClient } from "./apollo-client-integration-nextjs"; // Internal import

// Import de tipos
import type { DocumentNode } from "graphql"; // GraphQL type
import type { OperationVariables, TypedDocumentNode } from "@apollo/client"; // Apollo Client types

/**
 * GraphQLFetcherServer
 * A server-side function to execute GraphQL queries using Apollo Client.
 *
 * @template TVariables - The type of variables for the query.
 * @template TQuery - The type of the query result.
 * @param query - The GraphQL query document.
 * @param variables - The variables for the query.
 * @param init - Optional request initialization options.
 * @returns A promise resolving to the result of the query.
 */
export const GraphQLFetcherServer = async <TVariables extends OperationVariables, TQuery>(
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  variables: TVariables,
  init: RequestInit = {}
): Promise<TQuery> => {
  try {
    const { data, error } = await getClient().query<TQuery, TVariables>({
      query,
      variables,
      context: {
        fetchOptions: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'default',
          ...init,
        },
      }
    });

    if (error) {
      throw new Error(`GraphQLFetcherServer error: ${error.message}`);
    }
    
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
    
    throw new Error(`GraphQLFetcherServer failed: ${errorMessage}`);
  }
};
