import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { PlanetListResponse } from './../interfaces/planet-list-response.interface'
import { PlanetList } from './../interfaces/planet-list.interface'

@Injectable({ providedIn: 'root' })
export class PlanetListService {
  public planetList: PlanetList[]

  private apiLink: string = 'https://swapi.co/api/planets'
  private currentPaginationNumber = 1
  private paginationCount: number

  constructor(private http: HttpClient) {}

  public fetchPlanetList(): Observable<PlanetListResponse> {
    return this.http.get<PlanetListResponse>(this.apiLink).pipe(
      tap(res => {
        this.updatePaginationCount(res.count)
        this.planetList = res.results
      })
    )
  }

  public fetchNextPlanetList(): Observable<PlanetListResponse> {
    if (this.currentPaginationNumber === this.paginationCount)
      return new Observable(subscriber => {
        subscriber.next({ message: 'Out of range' })
      })

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
          this.currentPaginationNumber++
        })
      )
  }

  private updatePaginationCount(count: number) {
    this.paginationCount = Math.ceil(count / 10)
  }
}
