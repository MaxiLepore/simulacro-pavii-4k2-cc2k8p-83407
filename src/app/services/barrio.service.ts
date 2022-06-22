import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BarrioService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'barrios' + '/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}
