import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PlanetComponent } from './pages/planet/planet.component'
import { MainComponent } from './pages/main/main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: ':name',
    component: PlanetComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
