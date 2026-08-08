import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-listado-tickets',
  template: `
    <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="margin-top: 0;">📋 Gestión de Incidentes</h3>

      <!-- Buscador -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <input 
          type="number" 
          [(ngModel)]="busquedaId" 
          placeholder="Buscar por ID..." 
          style="padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px;"
        />
        <button (click)="buscarPorId()" style="background: #0088cc; color: #fff; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">🔍 Buscar</button>
        <button (click)="cargarTickets()" style="background: #6c757d; color: #fff; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">Limpiar</button>
      </div>

      <!-- Tabla de Tickets -->
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="border-bottom: 2px solid #eee;">
            <th style="padding: 8px;">ID</th>
            <th style="padding: 8px;">Título</th>
            <th style="padding: 8px;">Categoría</th>
            <th style="padding: 8px;">Estado</th>
            <th style="padding: 8px;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let ticket of tickets" style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;">{{ ticket.id }}</td>

            <!-- MODO LECTURA -->
            <ng-container *ngIf="ticketEditandoId !== ticket.id; else modoEdicion">
              <td style="padding: 8px;">{{ ticket.titulo }}</td>
              <td style="padding: 8px;">{{ ticket.categoria }}</td>
              <td style="padding: 8px;">
                <span style="font-weight: bold;">{{ ticket.estado }}</span>
              </td>
              <td style="padding: 8px; display: flex; gap: 0.4rem;">
                <!-- BOTÓN EDITAR -->
                <button 
                  (click)="iniciarEdicion(ticket)" 
                  style="background: #ffc107; color: #000; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;"
                >
                  Editar
                </button>
                <!-- BOTÓN ELIMINAR -->
                <button 
                  (click)="eliminar(ticket.id)" 
                  style="background: #dc3545; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;"
                >
                  Eliminar
                </button>
              </td>
            </ng-container>

            <!-- MODO EDICIÓN -->
            <ng-template #modoEdicion>
              <td style="padding: 8px;">
                <input [(ngModel)]="ticketEnEdicion.titulo" style="width: 90%; padding: 0.3rem; border: 1px solid #ccc; border-radius: 4px;" />
              </td>
              <td style="padding: 8px;">
                <input [(ngModel)]="ticketEnEdicion.categoria" style="width: 90%; padding: 0.3rem; border: 1px solid #ccc; border-radius: 4px;" />
              </td>
              <td style="padding: 8px;">
                <select [(ngModel)]="ticketEnEdicion.estado" style="padding: 0.3rem; border-radius: 4px; border: 1px solid #ccc;">
                  <option value="Abierto">Abierto</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Resuelto">Resuelto</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </td>
              <td style="padding: 8px; display: flex; gap: 0.4rem;">
                <!-- BOTÓN GUARDAR / ACTUALIZAR -->
                <button 
                  (click)="guardarActualizacion()" 
                  style="background: #28a745; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;"
                >
                  Guardar
                </button>
                <button 
                  (click)="cancelarEdicion()" 
                  style="background: #6c757d; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;"
                >
                  Cancelar
                </button>
              </td>
            </ng-template>

          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ListadoTicketsComponent implements OnInit {
  @Input() tickets: any[] = [];
  @Output() ticketEliminado = new EventEmitter<void>();

  busquedaId: number | null = null;

  // Variables para controlar la edición por fila
  ticketEditandoId: number | null = null;
  ticketEnEdicion: any = {};

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    if (!this.tickets || this.tickets.length === 0) {
      this.cargarTickets();
    }
  }

  cargarTickets() {
    this.busquedaId = null;
    this.ticketService.getTickets().subscribe(
      (data) => this.tickets = data,
      (err) => console.error('Error al cargar tickets:', err)
    );
  }

  // Activa el modo edición para el ticket seleccionado
  iniciarEdicion(ticket: any) {
    this.ticketEditandoId = ticket.id;
    this.ticketEnEdicion = { ...ticket }; // Copia independiente de los datos
  }

  // Cancela la edición y descarta cambios locales
  cancelarEdicion() {
    this.ticketEditandoId = null;
    this.ticketEnEdicion = {};
  }

  // Envia el objeto modificado al backend al presionar Guardar
  guardarActualizacion() {
    this.ticketService.updateTicket(this.ticketEnEdicion.id, this.ticketEnEdicion).subscribe(
      () => {
        this.ticketEditandoId = null;
        this.cargarTickets();
        this.ticketEliminado.emit(); // Notifica al dashboard para actualizar métricas
      },
      (err) => console.error('Error al actualizar ticket:', err)
    );
  }

  buscarPorId() {
    if (this.busquedaId) {
      this.ticketService.getTicketById(this.busquedaId).subscribe(
        (data) => this.tickets = data ? [data] : [],
        (err) => console.error('Error en búsqueda:', err)
      );
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este ticket definitivamente?')) {
      this.ticketService.deleteTicket(id).subscribe(
        () => {
          this.cargarTickets();
          this.ticketEliminado.emit();
        },
        (err) => console.error('Error al eliminar:', err)
      );
    }
  }
}