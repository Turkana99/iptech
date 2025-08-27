import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendRequest(req: any) {
    return this.http.post(environment.Appeals.create, req);
  }

  getContactData() {
    return this.http.get(environment.Contacts.getByClient);
  }
}
