import React, { createContext, useContext, ReactNode } from "react";
import { ApiData } from "../types";
import { useApi, ApiStatus } from "../hooks/useApi";

interface ApiContextType {
  status: ApiStatus;
  data: ApiData | null;
  error: Error | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { status, data, error } = useApi<ApiData>("api/get_data");

  return (
    <ApiContext.Provider value={{ status, data, error }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};
