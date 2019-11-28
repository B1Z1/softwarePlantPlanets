import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { PlanetListResponse } from './../interfaces/planet-list-response.interface'
import { PlanetObject } from './../interfaces/planet-object.interface'

@Injectable({ providedIn: 'root' })
export class PlanetListService {
  public planetList: PlanetObject[] = []
  public searchString = ''
  public _apiLink: string = 'https://swapi.co/api/planets'

  private currentPaginationNumber = 1
  private paginationCount: number
  private allResults: number
  private cachedPlanetList: PlanetObject[] = []

  constructor(private http: HttpClient) {}

  /**
   * @function fetchPlanetList
   * @description Fetch from api starter information and first elements,
   *              then save them in cache
   * @returns {PlanetListResponse}
   */
  public fetchPlanetList(): Observable<PlanetListResponse> {
    return this.http.get<PlanetListResponse>(this._apiLink).pipe(
      tap(res => {
        this.allResults = res.count
        this.updatePaginationCount(res.count)
        this.updateCache(res.results)
        this.updatePlanetList(res.results)
        this.incrementPaginationNumber()
      })
    )
  }

  /**
   * @function fetchNextPlanetList
   * @description Checks all planets in list,
   *              if all in, search by @param searchString
   *              and calls @function updatePlanetList
   *              If not, requests to api and getting
   *              new planets. Then cache them all
   *              and return @param Observable with requested planets
   * @returns {PlanetListResponse}
   */
  public fetchNextPlanetList(): Observable<PlanetListResponse> {
    if (this.isHaveAllPlanets() || this.searchString) {
      this.updatePlanetList(this.getFromCacheByName(this.searchString))
    }

    if (this.isHaveAllPlanets()) {
      return new Observable(subscriber => {
        subscriber.next({ message: 'From cache' })
      })
    }

    const response = this.http
      .get<PlanetListResponse>(this._apiLink, {
        params: {
          page: `${this.currentPaginationNumber}`,
          search: this.searchString
        }
      })
      .pipe(
        tap(res => {
          const { results, count } = res
          let newPlanetList: PlanetObject[] = this.findNewPlanets(results)

          this.updateCache([...this.cachedPlanetList, ...newPlanetList])
          this.updatePlanetList(this.searchString ? [...this.planetList, ...newPlanetList] : this.cachedPlanetList)

          console.log(this.cachedPlanetList, this.planetList)

          this.incrementPaginationNumber()
          this.updatePaginationCount(count)
        })
      )

    return response
  }

  public isHaveAllPlanets() {
    return this.allResults === this.cachedPlanetList.length
  }

  public isOutOfPaginationNumber() {
    return this.currentPaginationNumber > this.paginationCount
  }

  private getFromCacheByName(name: string): PlanetObject[] {
    return this.cachedPlanetList.filter(planet => planet.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
  }

  /**
   * @function findNewPlanets
   * @param {PlanetObject} results
   * @description Function search from results new planets
   *              which not in cached Array and save them
   * @returns {PlanetObject}
   */
  private findNewPlanets(results): PlanetObject[] {
    return results.filter(result => {
      const name = result.name.toLowerCase()
      return this.cachedPlanetList.filter(planet => planet.name.toLowerCase().indexOf(name) !== -1).length === 0
    })
  }

  private updateCache(list: PlanetObject[]) {
    this.cachedPlanetList = list.sort()
  }

  private updatePlanetList(list: PlanetObject[]) {
    this.planetList = list.sort()
  }

  public updateSearchString(string: string) {
    this.searchString = string
  }

  /**
   * @function updatePaginationCount
   * @param {number} count
   * @description Setting pagination count requests
   */
  private updatePaginationCount(count: number) {
    this.paginationCount = Math.ceil(count / 10)
  }

  public incrementPaginationNumber() {
    this.currentPaginationNumber++
  }

  /**
   * @function resetPaginationNumber
   * @description Resets paganiation number to 1.
   *              Uses when you will be need search another
   *              value from api
   */
  public resetPaginationNumber() {
    this.currentPaginationNumber = 1
  }

  get apiLink() {
    return this._apiLink
  }
}
