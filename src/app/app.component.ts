import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navegacion></app-navegacion>

    <div style="max-width: 1100px; margin: 0 auto; padding: 1rem;">
      <app-dashboard [total]="tickets.length" [pendientes]="tickets.length"></app-dashboard>

      <div style="margin-top: 1.5rem;">
        <router-outlet></router-outlet>
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