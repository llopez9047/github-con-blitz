import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navegacion',
  template: `
    <nav style="background: #1e293b; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <h2 style="margin: 0; font-size: 1.2rem;">🛠️ Mesa de Ayuda UTM - TICS</h2>
      
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <a routerLink="/tickets" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: #334155;">📋 Incidentes</a>
        <a routerLink="/nuevo-incidente" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: #2563eb;">➕ Nuevo Incidente</a>
        <a routerLink="/usuarios" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: #059669;">👥 Usuarios</a>
        
        <a *ngIf="!estaLogeado()" routerLink="/login" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: #d97706;">🔑 Login</a>
        <button *ngIf="estaLogeado()" (click)="logout()" style="background: #dc2626; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">🚪 Salir</button>
      </div>

      <span style="font-size: 0.85rem; color: #94a3b8;">
        {{ obtenerNombreUsuario() }}
      </span>
    </nav>
  `
})
export class NavegacionComponent {
  constructor(private authService: AuthService, private router: Router) {}

  estaLogeado(): boolean {
    return this.authService.getUsuarioId() !== null;
  }

  obtenerNombreUsuario(): string {
    const usuario = this.authService.getUsuario();
    return usuario ? `Usuario: ${usuario.nombre || usuario.email}` : 'Sesión no iniciada';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}