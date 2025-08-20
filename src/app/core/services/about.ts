import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { forkJoin, map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(environment?.AboutPages?.get);
  }

  getAllData() {
    return forkJoin([this.get()]).pipe(
      map(([about]) => {
        return {
          about,
        };
      })
    );
  }
}
