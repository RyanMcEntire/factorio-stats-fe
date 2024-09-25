type ProductionData = {
  [itemName: string]: number;
};

type ConsumptionData = {
  [itemName: string]: number;
};

type ResearchData = string[];

type ModsData = {
  [modName: string]: string;
};

export type SnapshotData = {
  tick: number;
  production: ProductionData;
  consumption: ConsumptionData;
  research: ResearchData;
  mods: ModsData;
};

export enum ApiStatus {
  Loading,
  Success,
  ErrorUnauthorized,
  Error,
  RefreshingToken,
  Retrying,
}

export interface IApiData {
  status: ApiStatus;
  error: any;
  data: any;
}
