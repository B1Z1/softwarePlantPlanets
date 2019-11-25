import { SearchService } from "./../shared/search.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit() {}
}
