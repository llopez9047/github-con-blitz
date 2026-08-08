import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-listado-tickets',
  template: `
    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; overflow-x: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <h3 style="margin: 0;">📋 Gestión de Incidentes</h3>
        
        <!-- BÚSQUEDA POR ID -->
        <div style="display: flex; gap: 0.5rem;">
          <input type="number" [(ngModel)]="busquedaId" placeholder="Buscar por ID..." style="padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px;">
          <button (click)="buscarPorId()" style="background: #0284c7; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">🔍 Buscar</button>
          <button (click)="cargarTickets()" style="background: #64748b; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">Limpiar</button>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left;">
            <th style="padding: 0.5rem;">ID</th>
            <th style="padding: 0.5rem;">Título</th>
            <th style="padding: 0.5rem;">Categoría</th>
            <th style="padding: 0.5rem;">Estado</th>
            <th style="padding: 0.5rem;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of tickets" style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.5rem;">{{ t.id }}</td>
            <td style="padding: 0.5rem;">{{ t.titulo }}</td>
            <td style="padding: 0.5rem;">{{ t.categoria }}</td>
            <td style="padding: 0.5rem;">
              <!-- CAMBIO DE ESTADO EN TIEMPO REAL (ACTUALIZAR) -->
              <select [ngModel]="t.estado || 'Abierto'" (ngModelChange)="cambiarEstado(t, $event)" style="padding: 0.2rem; border-radius: 4px;">
                <option value="Abierto">Abierto</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Resuelto">Resuelto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </td>
            <td style="padding: 0.5rem;">
              <!-- ELIMINAR TICKET -->
              <button (click)="eliminar(t.id)" style="background: #ef4444; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ListadoTicketsComponent implements OnInit {
  tickets: any[] = [];
  busquedaId: number;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.busquedaId = null;
    this.ticketService.getTickets().subscribe(
      (data) => this.tickets = data,
      (err) => console.error('Error al cargar tickets:', err)
    );
  }

  buscarPorId() {
    if (!this.busquedaId) return;
    this.ticketService.getTicketById(this.busquedaId).subscribe(
      (data) => this.tickets = data ? [data] : [],
      (err) => alert('No se encontró el ticket con ID: ' + this.busquedaId)
    );
  }

  cambiarEstado(ticket: any, nuevoEstado: string) {
    const ticketActualizado = { ...ticket, estado: nuevoEstado };
    this.ticketService.updateTicket(ticket.id, ticketActualizado).subscribe(
      () => {
        ticket.estado = nuevoEstado;
        alert(`Ticket #${ticket.id} actualizado a '${nuevoEstado}'`);
      },
      (err) => console.error('Error al actualizar estado:', err)
    );
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este ticket definitivamente?')) {
      this.ticketService.deleteTicket(id).subscribe(
        () => this.cargarTickets(),
        (err) => console.error('Error al eliminar:', err)
      );
    }
  }
}