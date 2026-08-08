import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private STORAGE_KEY = 'usuario_helpdesk';

  setUsuario(usuario: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }

  getUsuario(): any {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  getUsuarioId(): number | null {
    const usuario = this.getUsuario();
    return usuario ? usuario.id : null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}