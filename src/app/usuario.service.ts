import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {
  private baseUrl = 'https://helpdesk-backend-api2.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, usuario);
  }
}