import React from "react";
import { ApiStatus } from "../hooks/useApi.tsx";

type ApiStatusHandlerProps<T> = {
  status: ApiStatus;
  error: Error | null;
  data: T | null;
  render: (data: T) => React.ReactElement;
};

export function ApiStatusHandler<T>({
  status,
  error,
  data,
  render,
}: ApiStatusHandlerProps<T>): React.ReactElement | null {
  switch (status) {
    case ApiStatus.Error:
      return <p>Error: {error?.message || "An unknown error occurred"}</p>;
    case ApiStatus.Loading:
      return <p>Loading...</p>;
    case ApiStatus.Success:
      return data ? render(data) : null;
    case ApiStatus.Idle:
      return null;
    default:
      return <div>Unexpected status: {status}</div>;
  }
}
