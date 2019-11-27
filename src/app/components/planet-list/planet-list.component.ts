import { ScrollService } from './../../shared/services/scroll.service'
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core'

import { PlanetListService } from './../../shared/services/planet-list.service'

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  @ViewChildren('planetItems') $PlanetItems: ElementRef

  private isRequestWait = true

  constructor(private planetListService: PlanetListService, private scrollService: ScrollService) {}

  ngOnInit() {
    this.planetListService.fetchPlanetList().subscribe(res => {})

    this.scrollService.onScrolledDown$.subscribe(() => {
      if (this.isRequestWait) {
        this.planetListService.fetchNextPlanetList().subscribe(res => {
          this.isRequestWait = true
        })
      }
      this.isRequestWait = false
    })
  }
}
