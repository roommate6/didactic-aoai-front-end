const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: Response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const post = async <Body, Response>(
  endpoint: string,
  requestBody: Body
): Promise<Response> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as Response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
