import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-listado-usuarios',
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
      <!-- Formulario de Registro -->
      <div style="flex: 1 1 300px; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1;">
        <h3>👤 Registrar Usuario</h3>
        <form (ngSubmit)="guardarUsuario()">
          <div style="margin-bottom: 0.8rem;">
            <label>Nombre Completo:</label>
            <input type="text" [(ngModel)]="nuevoUsuario.nombre" name="nombre" required style="width: 100%; padding: 0.5rem;">
          </div>
          <div style="margin-bottom: 0.8rem;">
            <label>Correo:</label>
            <input type="email" [(ngModel)]="nuevoUsuario.email" name="email" required style="width: 100%; padding: 0.5rem;">
          </div>
          <div style="margin-bottom: 0.8rem;">
            <label>Rol:</label>
            <select [(ngModel)]="nuevoUsuario.rol" name="rol" style="width: 100%; padding: 0.5rem;">
              <option value="Cliente">Cliente</option>
              <option value="Tecnico">Técnico</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
          <button type="submit" style="background: #16a34a; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer;">
            Crear Usuario
          </button>
        </form>
      </div>

      <!-- Tabla de Usuarios -->
      <div style="flex: 2 1 400px; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; overflow-x: auto;">
        <h3>👥 Usuarios Registrados</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left;">
              <th style="padding: 0.5rem;">ID</th>
              <th style="padding: 0.5rem;">Nombre</th>
              <th style="padding: 0.5rem;">Correo</th>
              <th style="padding: 0.5rem;">Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of usuarios" style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 0.5rem;">{{ u.id }}</td>
              <td style="padding: 0.5rem;">{{ u.nombre }}</td>
              <td style="padding: 0.5rem;">{{ u.email }}</td>
              <td style="padding: 0.5rem;">{{ u.rol }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario = { nombre: '', email: '', rol: 'Cliente' };

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.ticketService.getUsuarios().subscribe(
      (data) => this.usuarios = data,
      (err) => console.error('Error al cargar usuarios:', err)
    );
  }

  guardarUsuario() {
    this.ticketService.registrarUsuario(this.nuevoUsuario).subscribe(
      () => {
        alert('Usuario creado exitosamente');
        this.nuevoUsuario = { nombre: '', email: '', rol: 'Cliente' };
        this.cargarUsuarios();
      },
      (err) => console.error('Error al crear usuario:', err)
    );
  }
}