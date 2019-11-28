import { ScrollService } from './../../shared/services/scroll.service'
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core'

import { PlanetListService } from './../../shared/services/planet-list.service'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  @ViewChildren('planetItems') $PlanetItems: ElementRef

  private isRequested = false

  constructor(private planetListService: PlanetListService, private scrollService: ScrollService) {
    console.log('inited')
  }

  ngOnInit() {
    this.scrollService.onScrolledDown$.subscribe(() => {
      if (!this.planetListService.isOutOfPaginationNumber()) {
        if (!this.isRequested) {
          this.planetListService
            .fetchNextPlanetList()
            .pipe(delay(300))
            .subscribe(res => {
              this.isRequested = false
              console.log(res)
            })
        }
        this.isRequested = true
      }
    })
  }
}
