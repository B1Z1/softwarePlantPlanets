import { Component } from '@angular/core'
import { PlanetListService } from './shared/services/planet-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Planets'

  constructor(private planetListService: PlanetListService) {
    this.planetListService.fetchPlanetList().subscribe(res => {})
  }
}
