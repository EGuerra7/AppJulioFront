import { AdmAuthService } from './components/service/security/adm-auth.service';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AuthLoginService } from './components/service/security/auth-login.service';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:"cliente",
    component: ClienteComponent,
    canActivate: [AuthLoginService]
  },
  {
    path:"administrador",
    component: AdministradorComponent,
    canActivate: [AdmAuthService]
  }
];
