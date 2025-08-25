import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}

  getAllData() {
    return forkJoin([
      this.getHomepage(),
      this.getPartners(),
      this.getAboutUs(),
      this.getServices(),
      this.getCustomers(),
      this.getProducts(),
      this.getContacts(),
      this.getServicesList(),
      this.getProductsList(),
    ]).pipe(
      map(
        ([
          homepage,
          partners,
          about,
          services,
          customers,
          products,
          contacts,
          servicesList,
          prodsuctsList,
        ]) => {
          return {
            homepage,
            partners,
            about,
            services,
            customers,
            products,
            contacts,
            servicesList,
            prodsuctsList,
          };
        }
      )
    );
  }

  getHomepage() {
    return this.http.get(environment.HomePages.getByClient);
  }

  getPartners() {
    return this.http.get(environment.Partners.getByClient);
  }

  getAboutUs() {
    return this.http.get(environment.AboutPages.get);
  }

  getServices() {
    return this.http.get(environment.ServicePages.get);
  }

  getCustomers() {
    return this.http.get(environment.Customers.getByClient);
  }

  getProducts() {
    return this.http.get(environment.ProductPages.get);
  }

  getContacts() {
    return this.http.get(environment.Contacts.getByClientHome);
  }

  getServicesList() {
    return this.http.get(environment.Services.getByCount);
  }

  getProductsList() {
    return this.http.get(environment.Products.listByHomePage);
  }
}
