import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
  private planetObject: PlanetObject = {
    name: '',
    climate: '',
    created: '',
    diameter: '',
    edited: '',
    gravity: '',
    orbital_period: '',
    population: '',
    rotation_period: '',
    surface_water: '',
    terrain: ''
  }
  private isLoaded = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private planetListService: PlanetListService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planetName = params.name.toLowerCase()
      this.http
        .get<PlanetListResponse>(this.planetListService.apiLink, {
          params: {
            search: this.planetName
          }
        })
        .subscribe(res => {
          const { results, count } = res
          if (count === 0) this.router.navigate(['/'])
          else {
            const name = results[0].name.toLowerCase()
            if (name !== this.planetName) this.router.navigate([name])
            this.planetObject = res.results[0]
            this.isLoaded = true
          }
        })
    })
  }
}
