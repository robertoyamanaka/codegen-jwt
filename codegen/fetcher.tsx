import { useAuth } from "@clerk/nextjs";
import axios, { AxiosError, isAxiosError } from "axios";

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export const useFetchGraphQLData = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  const { getToken } = useAuth();
  const url =
    "https://dummyjson.com"; // Replace this with your GraphQL API URL

  return async (variables?: TVariables) => {
    const token = await getToken();

    try {
      const response = await axios.post<GraphQLResponse<TData>>(
        url,
        {
          query,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const serverError = error as AxiosError<GraphQLResponse<unknown>>;
        if (serverError && serverError.response) {
          const errorMessage =
            serverError.response.data.errors?.[0]?.message ||
            "Error in GraphQL request";
          throw new Error(errorMessage);
        }
      }
      throw error;
    }
  };
};
