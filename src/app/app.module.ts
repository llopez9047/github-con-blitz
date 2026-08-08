import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion.component';
import { DashboardComponent } from './components/dashboard.component';
import { RegistroIncidenteComponent } from './components/registro-incidente.component';
import { ListadoTicketsComponent } from './components/listado-tickets.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios.component';
import { LoginComponent } from './components/login.component';
import { TicketService } from './ticket.service';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tickets', component: ListadoTicketsComponent },
  { path: 'nuevo-incidente', component: RegistroIncidenteComponent },
  { path: 'usuarios', component: ListadoUsuariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    DashboardComponent,
    ListadoTicketsComponent,
    RegistroIncidenteComponent,
    LoginComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    RouterModule.forRoot(routes)
  ],
  providers: [TicketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }