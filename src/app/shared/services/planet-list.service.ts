import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { PlanetListResponse } from './../interfaces/planet-list-response.interface'
import { PlanetList } from './../interfaces/planet-list.interface'

@Injectable({ providedIn: 'root' })
export class PlanetListService {
  public planetList: PlanetList[] = []
  public searchString = ''

  private apiLink: string = 'https://swapi.co/api/planets'
  private currentPaginationNumber = 1
  private paginationCount: number
  private allResults: number
  private cachedPlanetList: PlanetList[] = []

  constructor(private http: HttpClient) {}

  public fetchPlanetList(): Observable<PlanetListResponse> {
    return this.http.get<PlanetListResponse>(this.apiLink).pipe(
      tap(res => {
        this.allResults = res.count
        this.updatePaginationCount(res.count)
        this.updateCache(res.results)
        this.updatePlanetList(res.results)
        this.incrementPaginationNumber()
      })
    )
  }

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
      .get<PlanetListResponse>(this.apiLink, {
        params: {
          page: `${this.currentPaginationNumber}`,
          search: this.searchString
        }
      })
      .pipe(
        tap(res => {
          const { results, count } = res
          let newPlanetList: PlanetList[] = this.findNewPlanets(results)

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

  private getFromCacheByName(name: string): PlanetList[] {
    return this.cachedPlanetList.filter(planet => planet.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
  }

  public updateSearchString(string: string) {
    this.searchString = string
  }

  private findNewPlanets(results): PlanetList[] {
    return results.filter(result => {
      const name = result.name.toLowerCase()
      return this.cachedPlanetList.filter(planet => planet.name.toLowerCase().indexOf(name) !== -1).length === 0
    })
  }

  private updateCache(list: PlanetList[]) {
    this.cachedPlanetList = list.sort()
  }

  private updatePlanetList(list: PlanetList[]) {
    this.planetList = list.sort()
  }

  private updatePaginationCount(count: number) {
    this.paginationCount = Math.ceil(count / 10)
  }

  public incrementPaginationNumber() {
    this.currentPaginationNumber++
  }

  public resetPaginationNumber() {
    this.currentPaginationNumber = 1
  }
}
