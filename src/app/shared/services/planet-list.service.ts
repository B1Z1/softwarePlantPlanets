import { HttpClient } from '@angular/common/http'
import { Observable, throwError, observable } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

import { PlanetListResponse } from './../interfaces/planet-list-response.interface'
import { PlanetList } from './../interfaces/planet-list.interface'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class PlanetListService {
  public planetList: PlanetList[] = []
  private apiLink = 'https://swapi.co/api/planets'
  private currentPaginationNumber = 1
  private paginationCount: number

  constructor(private http: HttpClient) {}

  fetchPlanetList(): Observable<PlanetListResponse> {
    return this.http.get<PlanetListResponse>(this.apiLink).pipe(
      tap(res => {
        this.updatePaginationCount(res.count)
        this.planetList = res.results
      })
    )
  }

  fetchNextPlanetList(): Observable<PlanetListResponse> | null {
    if (this.currentPaginationNumber + 1 === this.paginationCount) return null

    return this.http
      .get<PlanetListResponse>(this.apiLink, {
        params: {
          page: `${this.currentPaginationNumber + 1}`
        }
      })
      .pipe(
        tap(res => {
          this.updatePaginationCount(res.count)
          this.planetList = [...this.planetList, ...res.results]
        })
      )
  }

  updatePaginationCount(count: number) {
    this.paginationCount = Math.ceil(count / 10)
  }
}
