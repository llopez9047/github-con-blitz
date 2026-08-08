import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private STORAGE_KEY = 'usuario_helpdesk';

  // Guardar datos del usuario al logearse
  setUsuario(usuario: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }

  // Obtener todos los datos del usuario activo
  getUsuario(): any {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Obtener únicamente el ID del usuario activo
  getUsuarioId(): number | null {
    const usuario = this.getUsuario();
    return usuario ? usuario.id : null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}