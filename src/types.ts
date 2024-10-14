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
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface IApiData {
  status: ApiStatus;
  error: any;
  data: any;
}

export interface ApiItem {
  tick: string;
  item: string;
  amount: number;
}

export interface ResearchItem {
  tick: string;
  technology: string;
}

export interface ModItem {
  tick: string;
  name: string;
  version: string;
}

export interface ProductionConsumptionItem {
  tick: string;
  item: string;
  delta_amount: number;
}

export interface SurfaceData {
  [surfaceName: string]: ProductionConsumptionItem[];
}

export interface ApiData {
  production: SurfaceData;
  consumption: SurfaceData;
  research: ResearchItem[];
  mods: ModItem[];
}
