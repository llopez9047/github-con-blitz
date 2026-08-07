import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-registro-incidente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
      <h3>📝 Reportar Nuevo Incidente</h3>
      <form (ngSubmit)="guardarTicket()">
        <div style="margin-bottom: 0.8rem;">
          <label>Título del Incidente:</label><br>
          <input type="text" [(ngModel)]="nuevoTicket.titulo" name="titulo" required style="width: 100%; padding: 0.5rem;">
        </div>
        <div style="margin-bottom: 0.8rem;">
          <label>Descripción:</label><br>
          <textarea [(ngModel)]="nuevoTicket.descripcion" name="descripcion" required style="width: 100%; padding: 0.5rem;"></textarea>
        </div>
        <div style="margin-bottom: 0.8rem;">
          <label>Categoría:</label><br>
          <select [(ngModel)]="nuevoTicket.categoria" name="categoria" style="width: 100%; padding: 0.5rem;">
            <option value="Redes">Redes</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
        </div>
        <button type="submit" style="background: #2563eb; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer;">
          Guardar Incidente
        </button>
      </form>
    </div>
  `
})
export class RegistroIncidenteComponent {
  @Output() ticketCreado = new EventEmitter<void>();

  nuevoTicket = {
    titulo: '',
    descripcion: '',
    categoria: 'Redes',
    prioridad: 'Media',
    usuario_id: 5 // Usamos un ID de usuario registrado en la BD
  };

  constructor(private ticketService: TicketService) {}

  guardarTicket() {
    this.ticketService.createTicket(this.nuevoTicket).subscribe({
      next: () => {
        alert('Ticket registrado con éxito');
        this.nuevoTicket = { titulo: '', descripcion: '', categoria: 'Redes', prioridad: 'Media', usuario_id: 1 };
        this.ticketCreado.emit(); // Notifica para recargar el listado
      },
      error: (err) => console.error('Error al crear ticket:', err)
    });
  }
}