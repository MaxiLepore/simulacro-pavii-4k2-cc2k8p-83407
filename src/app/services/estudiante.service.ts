import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Estudiante } from '../models/estudiante';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'estudiantes' + '/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Estudiante) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
