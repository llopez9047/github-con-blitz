import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navegacion></app-navegacion>

    <div style="max-width: 1100px; margin: 0 auto; padding: 1rem;">
      <app-dashboard [total]="tickets.length" [pendientes]="tickets.length"></app-dashboard>

      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 1.5rem; margin-top: 1rem;">
        <app-registro-incidente (ticketCreado)="cargarTickets()"></app-registro-incidente>
        <app-listado-tickets [tickets]="tickets" (ticketEliminado)="cargarTickets()"></app-listado-tickets>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets = data,
      error: (err) => console.error('Error al cargar tickets:', err)
    });
  }
}