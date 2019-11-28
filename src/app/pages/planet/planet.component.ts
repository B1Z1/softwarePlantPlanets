import { tap } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'

import { PlanetListService } from './../../shared/services/planet-list.service'
import { PlanetListResponse } from './../../shared/interfaces/planet-list-response.interface'
import { PlanetObject } from 'src/app/shared/interfaces/planet-object.interface'

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  private planetName: string
  private planetObject: PlanetObject

  constructor(private route: ActivatedRoute, private http: HttpClient, private planetListService: PlanetListService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planetName = params.name
      this.http
        .get<PlanetListResponse>(this.planetListService.apiLink, {
          params: {
            search: this.planetName
          }
        })
        .subscribe(res => {
          this.planetObject = res.results[0]
          console.log(this.planetObject)
        })
    })
  }
}
