import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {
  private apiUrl = 'URL_DE_TU_API_NODEJS'; // Reemplazar con la URL real de Node.js / Express

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/tickets`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/tickets`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/tickets/${id}`);
  }
}