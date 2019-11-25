import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SearchService {
  public planetName: string = "";

  changeName(a) {
    const newName = a;
    this.planetName = newName;
  }
}
