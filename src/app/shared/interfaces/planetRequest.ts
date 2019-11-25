import { PlanetList } from "./planetlist";
export interface PlanetRequest {
  currentPagination: string;
  count: number;
  results: PlanetList[];
}
