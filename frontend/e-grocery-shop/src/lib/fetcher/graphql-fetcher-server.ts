'use server'

// Import interno
import fetcher from "."; // Internal import

export const GraphQLFetcherServer = async <TVariables, TQuery>(
  query: string,
  variables: TVariables,
  init: RequestInit = {}
): Promise<TQuery> => {
  try {
    const data = await fetcher(
      `${process.env.API_URL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: 'default',
        ...init,
      }
    );

    return data;
  } catch (error: unknown) {
    console.error("Error in GraphQLFetcherServer:", error);

    if (error instanceof Error) {
      throw new Error(`GraphQLFetcherServer failed: ${error.message}`);
    } else {
      throw new Error("GraphQLFetcherServer failed: Unknown error occurred.");
    }
  }
};
