import { AdmAuthService } from './components/service/security/adm-auth.service';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AuthLoginService } from './components/service/security/auth-login.service';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LojaComponent } from './components/loja/loja.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { FotosComponent } from './components/administrador/fotos/fotos.component';
import { PortfolioComponent } from './components/administrador/portfolio/portfolio.component';
import { CuponsComponent } from './components/administrador/cupons/cupons.component';
import { ClientesComponent } from './components/administrador/clientes/clientes.component';
import { CuponsIndividualComponent } from './components/cliente/cupons-individual/cupons-individual.component';
import { ControleFeedComponent } from './components/administrador/controle-feed/controle-feed.component';

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
  },
  {
    path:"loja",
    component: LojaComponent,
    canActivate: [AuthLoginService]
  },
  {
    path:"feedbacks",
    component: FeedbacksComponent
  },
  {
    path:"fotos",
    component:FotosComponent,
    canActivate: [AdmAuthService]
  },
  {
    path:"registroClientes",
    component:ClientesComponent,
    canActivate: [AdmAuthService]
  },
  {
    path:"portifolio",
    component: PortfolioComponent,
    canActivate: [AdmAuthService]
  },
  {
    path:"cupons",
    component:CuponsComponent,
    canActivate: [AdmAuthService]
  },
  {
    path:"cupom",
    component: CuponsIndividualComponent,
    canActivate: [AuthLoginService]
  },
  {
    path:"controleFeed",
    component: ControleFeedComponent,
    canActivate: [AdmAuthService]
  }
];
