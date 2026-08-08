import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {
  // Cambia la URL por la de tu servidor backend en Render
  private apiUrl = 'https://helpdesk-backend-api2.onrender.com'; 

  constructor(private http: HttpClient) {}

  // 1. AGREGAR ESTE MÉTODO PARA RESOLVER EL ERROR TS2339
  login(credenciales: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, credenciales);
  }

  // --- Demás métodos de Tickets y Usuarios ---
  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/tickets`);
  }

  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tickets/${id}`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/tickets`, ticket);
  }

  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/tickets/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/tickets/${id}`);
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/usuarios`, usuario);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/usuarios`);
  }
}