import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion.component';
import { DashboardComponent } from './components/dashboard.component';
import { RegistroIncidenteComponent } from './components/registro-incidente.component';
import { ListadoTicketsComponent } from './components/listado-tickets.component';
import { TicketService } from './ticket.service';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    DashboardComponent,
    RegistroIncidenteComponent,
    ListadoTicketsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TicketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }