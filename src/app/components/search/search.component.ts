import { PlanetListService } from './../../shared/services/planet-list.service'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef

  private searchString = ''

  constructor(private planetListService: PlanetListService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.planetListService.resetPaginationNumber()
        this.planetListService.updateSearchString(this.searchString)
        this.planetListService.fetchNextPlanetList().subscribe(res => console.log(res))
      })
  }
}
