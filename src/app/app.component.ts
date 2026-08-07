import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navegacion></app-navegacion>

    <div style="max-width: 1100px; margin: 0 auto; padding: 1rem;">
      <app-dashboard [total]="tickets.length" [pendientes]="tickets.length"></app-dashboard>

      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 1rem;">
        <div style="flex: 1 1 320px;">
          <app-registro-incidente (ticketCreado)="cargarTickets()"></app-registro-incidente>
        </div>
        <div style="flex: 2 1 400px; overflow-x: auto;">
          <app-listado-tickets [tickets]="tickets" (ticketEliminado)="cargarTickets()"></app-listado-tickets>
        </div>
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
    this.ticketService.getTickets().subscribe(
      (data) => this.tickets = data,
      (err) => console.error('Error al cargar tickets:', err)
    );
  }
}