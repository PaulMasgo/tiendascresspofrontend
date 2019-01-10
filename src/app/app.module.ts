import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//rutas 


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
//rutas
import { APP_ROUTES } from './app.routes';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    NotfoundComponent,
    BlogComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
