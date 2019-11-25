import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Pagination {
  current: string;
  count: Array<any>;
  devider: number;
}

export interface PlanetList {
  name: string;
  rotation_period: string;
}

export interface PlanetRequest {
  currentPagination: string;
  count: number;
  results: PlanetList[];
}

@Injectable({ providedIn: "root" })
export class PlanetListService {
  public planetList = {};
  public searchString = "";
  public pagination: Pagination = {
    current: "1",
    count: [],
    devider: 10
  };

  constructor(private http: HttpClient) {}

  fetchPlanetData(pagination: string = "1", searchString: string = ""): void {
    this.http
      .get<PlanetRequest>("https://swapi.co/api/planets", {
        params: {
          page: pagination,
          search: searchString
        }
      })
      .subscribe(res => {
        const { results, count } = res;
        this.pagination.count = Array(
          Math.ceil(count / this.pagination.devider)
        );
        this.planetList[pagination] = results;
        this.pagination.current = pagination;
      });
  }

  updatePagination(i: string) {
    if (this.planetList.hasOwnProperty(i)) {
      this.pagination.current = i;
    } else {
      this.fetchPlanetData(i, this.searchString);
    }
  }
}
