import { Component, OnInit } from '@angular/core'
import { mergeMap, delay } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { PlanetListService } from './../../shared/services/planet-list.service'
import { PlanetListResponse } from './../../shared/interfaces/planet-list-response.interface'

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  constructor(private planetListService: PlanetListService) {}

  ngOnInit() {
    this.planetListService.fetchPlanetList().subscribe()
  }
}
