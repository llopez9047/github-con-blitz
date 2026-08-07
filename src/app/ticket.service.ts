import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  // Reemplaza con la URL pública de tu API desplegada en Render
  private API_URL = 'https://helpdesk-backend-api2.onrender.com/api';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/tickets`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/tickets`, ticket);
  }

  updateTicket(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/tickets/${id}`, data);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/tickets/${id}`);
  }
}