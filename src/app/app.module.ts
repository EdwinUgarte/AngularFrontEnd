import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { Footer } from './components/Footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteService } from './components/clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clientes/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //!Aqui se asignan las rutas para los componentes
  { path: 'home', component: InicioComponent },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Footer,
    DirectivaComponent,
    ClientesComponent,
    InicioComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, //!Este modulo permite poder utilizar el backend en la clase cLiente.service
    RouterModule.forRoot(routes), //!Se tiene que implementar el RouterModule aqui ya que si no no los reconoceria
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
