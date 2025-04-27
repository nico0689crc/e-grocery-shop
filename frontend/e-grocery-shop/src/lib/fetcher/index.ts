/**
 * A utility function to perform HTTP requests.
 * @param url - The URL to fetch.
 * @param options - Optional configuration for the request.
 * @returns The parsed JSON response.
 */
const fetcher = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it upstream
  }
};

export default fetcher;
