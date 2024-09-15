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
