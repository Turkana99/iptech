import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(environment?.AboutPages?.get);
  }

  getQualities() {
    return this.http.get(environment?.Qualities.getByClient);
  }

  getStatistics() {
    return this.http.get(environment.Statistics.getByClient);
  }

  getHomepage() {
    return this.http.get(environment.HomePages.getByClient);
  }

  getAllData() {
    return forkJoin([
      this.get(),
      this.getQualities(),
      this.getStatistics(),
      this.getHomepage(),
    ]).pipe(
      map(([about, qualities, statistics, homepage]) => {
        return {
          about,
          qualities,
          statistics,
          homepage,
        };
      })
    );
  }
}
