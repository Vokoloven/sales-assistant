export const httpService = () => {
  const POST = async <T, U>({data, url}: {data: T; url: string}): Promise<U> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw new Error('Unknown error occurred');
    }
  };

  return {POST};
};
