import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service'; 

@Component({
  selector: 'app-listado-usuarios',
  template: `
    <div style="max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
      
      <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="margin-top: 0;">👤 Registrar Usuario</h3>
        <form (ngSubmit)="crearUsuario()" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.3rem; font-weight: 500;">Nombre Completo:</label>
            <input type="text" [(ngModel)]="nuevoUsuario.nombre" name="nombre" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.3rem; font-weight: 500;">Correo Electrónico:</label>
            <input type="email" [(ngModel)]="nuevoUsuario.email" name="email" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.3rem; font-weight: 500;">Contraseña:</label>
            <input type="password" [(ngModel)]="nuevoUsuario.password" name="password" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.3rem; font-weight: 500;">Rol:</label>
            <select [(ngModel)]="nuevoUsuario.rol" name="rol" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
              <option value="Cliente">Cliente</option>
              <option value="Técnico">Técnico</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div>
            <button type="submit" style="background: #00a65a; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>

      <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="margin-top: 0;">👥 Usuarios Registrados</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #f0f4f8;">
              <th style="padding: 10px;">ID</th>
              <th style="padding: 10px;">Nombre</th>
              <th style="padding: 10px;">Email</th>
              <th style="padding: 10px;">Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of usuarios" style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px;">{{ u.id }}</td>
              <td style="padding: 10px;">{{ u.nombre }}</td>
              <!-- Muestra la propiedad u.email del objeto -->
              <td style="padding: 10px;">{{ u.email }}</td>
              <td style="padding: 10px;">
                <span style="background: #e9ecef; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; font-weight: 500;">
                  {{ u.rol }}
                </span>
              </td>
            </tr>

            <tr *ngIf="usuarios.length === 0">
              <td colspan="4" style="text-align: center; padding: 15px; color: #666;">
                No hay usuarios registrados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  `
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  
  nuevoUsuario = { 
    nombre: '', 
    email: '', 
    password: '', 
    rol: 'Cliente' 
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (data) => this.usuarios = data,
      (err) => console.error('Error al obtener usuarios:', err)
    );
  }

  crearUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
      () => {
        this.nuevoUsuario = { nombre: '', email: '', password: '', rol: 'Cliente' };
        this.cargarUsuarios(); 
      },
      (err) => console.error('Error al crear usuario desde Angular:', err)
    );
  }
}