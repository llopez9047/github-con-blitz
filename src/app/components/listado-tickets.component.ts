import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-listado-tickets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: #ffffff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
      <h3>📋 Listado de Incidentes</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
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
              <span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; background: #dbeafe; color: #1e40af;">
                {{ t.estado || 'Abierto' }}
              </span>
            </td>
            <td style="padding: 0.5rem;">
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
export class ListadoTicketsComponent {
  @Input() tickets: any[] = [];
  @Output() ticketEliminado = new EventEmitter<void>();

  constructor(private ticketService: TicketService) {}

  eliminar(id: number) {
    if (confirm('¿Eliminar este ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => this.ticketEliminado.emit(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}