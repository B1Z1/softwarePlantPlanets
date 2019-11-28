import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { PlanetListComponent } from './components/planet-list/planet-list.component';
import { SearchComponent } from './components/search/search.component';
import { HeroComponent } from './components/hero/hero.component';
import { PlanetComponent } from './pages/planet/planet.component';
import { MainComponent } from './pages/main/main.component';
import { StardropComponent } from './components/stardrop/stardrop.component';
import { LoaderComponent } from './components/loader/loader.component'

@NgModule({
  declarations: [AppComponent, PlanetListComponent, SearchComponent, HeroComponent, PlanetComponent, MainComponent, StardropComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
