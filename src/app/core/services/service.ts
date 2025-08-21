import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginatorOptions } from '../consts';
import { environment } from '../../../environments/environment';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getList(paginatorOptions: IPaginatorOptions) {
    return this.http.get(environment.Services?.getList(paginatorOptions));
  }

  getServicePageData() {
    return this.http.get(environment.ServicePages?.get());
  }

  getBySlug(slug: string) {
    return this.http.get(environment.Services.getBySlug(slug));
  }

  getAllData(paginatorOptions: IPaginatorOptions) {
    return forkJoin([
      this.getList(paginatorOptions),
      this.getServicePageData(),
    ]).pipe(
      map(([services, servicePage]) => {
        return {
          services,
          servicePage,
        };
      })
    );
  }
}
