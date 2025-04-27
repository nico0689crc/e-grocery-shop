'use server'

export const graphQLDataFetcher = async <TVariables, TQuery>(
  query: string,
  variables: TVariables,
  init: RequestInit = {}
): Promise<TQuery> => {
  // Perform the GraphQL request
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST_DOMAIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    }),
    cache: 'default',
    ...init
  })

  if (!response.ok) {
    console.error('Error in GraphQL query:', response.statusText)
    throw new Error(`Error in GraphQL query: ${response.statusText}`)
  }

  const result: { data: TQuery } = await response.json()

  return result.data
}
