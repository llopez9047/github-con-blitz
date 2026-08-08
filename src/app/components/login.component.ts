import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div style="max-width: 400px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; border: 1px solid #cbd5e1;">
      <h3 style="text-align: center;">🔑 Iniciar Sesión</h3>
      <form (ngSubmit)="onLogin()">
        <div style="margin-bottom: 1rem;">
          <label>Correo Electrónico:</label>
          <input type="email" [(ngModel)]="credenciales.email" name="email" required style="width: 100%; padding: 0.5rem; margin-top: 0.2rem;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label>Contraseña:</label>
          <input type="password" [(ngModel)]="credenciales.password" name="password" required style="width: 100%; padding: 0.5rem; margin-top: 0.2rem;">
        </div>
        <button type="submit" style="width: 100%; background: #2563eb; color: white; border: none; padding: 0.7rem; border-radius: 4px; cursor: pointer;">
          Ingresar
        </button>
      </form>
    </div>
  `
})
export class LoginComponent {
  credenciales = { email: '', password: '' };

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.ticketService.login(this.credenciales).subscribe(
      (res) => {
        // Ejemplo de respuesta del servidor: { ok: true, usuario: { id: 12, nombre: 'Lauro López', email: '...' } }
        const usuarioLogeado = res.usuario || res; 
        
        // Guardamos temporalmente el usuario en localStorage
        this.authService.setUsuario(usuarioLogeado);

        alert(`Bienvenido, ${usuarioLogeado.nombre || 'al sistema'}`);
        this.router.navigate(['/tickets']);
      },
      (err) => alert('Credenciales incorrectas')
    );
  }
}