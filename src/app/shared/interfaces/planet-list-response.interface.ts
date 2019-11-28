import { PlanetObject } from 'src/app/shared/interfaces/planet-object.interface'
export interface PlanetListResponse {
  count?: number
  results?: PlanetObject[]
  message?: string
}
