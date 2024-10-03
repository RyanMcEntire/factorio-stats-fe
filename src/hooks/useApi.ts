import { useState, useEffect } from "react";

export enum ApiStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface ApiResponse<T> {
  status: ApiStatus;
  data: T | null;
  error: Error | null;
}

const API_KEY = import.meta.env.VITE_API_KEY as string;

export function useApi<T>(url: string): ApiResponse<T> {
  const [state, setState] = useState<ApiResponse<T>>({
    status: ApiStatus.Idle,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, status: ApiStatus.Loading }));
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setState({ status: ApiStatus.Success, data, error: null });
      } catch (error) {
        setState({
          status: ApiStatus.Error,
          data: null,
          error:
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
