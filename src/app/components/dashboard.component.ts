import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div style="display: flex; gap: 1rem; margin: 1.5rem 0;">
      <div style="background: #e2e8f0; padding: 1rem; border-radius: 8px; flex: 1; text-align: center;">
        <h3>Total Tickets</h3>
        <p style="font-size: 1.5rem; font-weight: bold;">{{ total }}</p>
      </div>
      <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; flex: 1; text-align: center;">
        <h3>Abiertos / Pendientes</h3>
        <p style="font-size: 1.5rem; font-weight: bold; color: #d97706;">{{ pendientes }}</p>
      </div>
    </div>
  `
})
export class DashboardComponent {
  @Input() total: number = 0;
  @Input() pendientes: number = 0;
}