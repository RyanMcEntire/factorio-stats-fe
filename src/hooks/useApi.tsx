import React, { useState } from "react";

export enum ApiStatus {
  Loading,
  Success,
  ErrorUnauthorized,
  Error,
  RefreshingToken,
  Retrying,
}

interface IApiData {
  status: ApiStatus;
  error: any;
  data: any;
}

export const useApi = (url: string, body = {}) => {
  const [retryToggle, setRetryToggle] = useState(false);
  const [data, setData] = React.useState<IApiData>({
    status: ApiStatus.Loading,
    error: null,
    data: null,
  });

  React.useEffect(() => {
    if (data.status === ApiStatus.RefreshingToken) {
      console.log("Attempting to refresh access token");
      myRefreshTokenFn() // TODO: implement this
        .then(() => {
          setData({
            status: ApiStatus.Retrying,
            data: null,
            error: null,
          });

          setRetryToggle((i: boolean) => !i);
        })
        .catch((err: MyRefreshTokenError) => {
          if (err === MyRefreshTokenError.Expired) {
            setData({
              status: ApiStatus.ErrorUnauthorized,
              data: null,
              error: err,
            });
          } else {
            setData({
              status: ApiStatus.Error,
              data: null,
              error: err,
            });
          }
        });
      return;
    }
    const authToken = myAuthTokenFn(); // TODO: implement this
    const request: RequestInit = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    fetch(url, request)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData({
          status: ApiStatus.Success,
          error: null,
          data,
        });
      })
      .catch((err: Error) => {
        if (data.status === ApiStatus.Retrying) {
          console.log("Unauthorized. Not retrying:", data.status);
          setData({
            status: ApiStatus.ErrorUnauthorized,
            data: null,
            error: err,
          });
          return;
        }

        switch (err.message) {
          case "Unauthorized":
            setData({
              status: ApiStatus.RefreshingToken,
              data: null,
              error: err,
            });

            setRetryToggle((i: boolean) => !i);
            break;
          default:
            setData({
              status: ApiStatus.Error,
              data: null,
              error: err,
            });
        }
      });
  }, [retryToggle]);

  return data;
};
