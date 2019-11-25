import { Pagination } from "./../../shared/interfaces/pagination";
import { PlanetListService } from "../../shared/services/planet-list.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-planet-list",
  templateUrl: "./planet-list.component.html",
  styleUrls: ["./planet-list.component.scss"]
})
export class PlanetListComponent implements OnInit {
  planetList = {};
  pagination: Pagination;

  constructor(private planetListService: PlanetListService) {
    this.planetList = this.planetListService.planetList;
    this.pagination = this.planetListService.pagination;
  }

  ngOnInit() {
    this.planetListService.fetchPlanetData();
  }

  changePage(i: number) {
    this.planetListService.updatePagination(`${i}`);
  }
}
