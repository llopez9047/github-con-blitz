import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../ticket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro-incidente',
  template: `
    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
      <h3>📝 Reportar Nuevo Incidente</h3>
      <p style="font-size: 0.85rem; color: #475569;">
        Reportando como: <strong>{{ nombreUsuario }}</strong> (ID: {{ nuevoTicket.usuario_id }})
      </p>

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
export class RegistroIncidenteComponent implements OnInit {
  @Output() ticketCreado = new EventEmitter<void>();

  nombreUsuario = 'Sin Autenticar';
  nuevoTicket = {
    titulo: '',
    descripcion: '',
    categoria: 'Redes',
    prioridad: 'Media',
    usuario_id: null
  };

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.nuevoTicket.usuario_id = usuario.id;
      this.nombreUsuario = usuario.nombre || usuario.email;
    }
  }

  guardarTicket() {
    if (!this.nuevoTicket.usuario_id) {
      alert('Debes iniciar sesión para reportar un incidente.');
      return;
    }

    this.ticketService.createTicket(this.nuevoTicket).subscribe(
      () => {
        alert('Ticket registrado con éxito');
        const idActual = this.nuevoTicket.usuario_id;
        this.nuevoTicket = {
          titulo: '',
          descripcion: '',
          categoria: 'Redes',
          prioridad: 'Media',
          usuario_id: idActual
        };
        this.ticketCreado.emit();
      },
      (err) => console.error('Error al crear ticket:', err)
    );
  }
}