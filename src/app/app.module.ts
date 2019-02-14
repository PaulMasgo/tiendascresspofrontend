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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarritocomprasComponent } from './pages/carritocompras/carritocompras.component';
import { CarritoComponent } from './shared/carrito/carrito.component';
import { RegisterComponent } from './pages/register/register.component';
import { ImagenesPipe } from './pipes/imagenes.pipe';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ProductComponent } from './shared/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AddAddressComponent } from './pages/address/add-address/add-address.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

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
    LoginComponent,
    CarritocomprasComponent,
    CarritoComponent,
    RegisterComponent,
    ImagenesPipe,
    ViewproductComponent,
    VerificationComponent,
    ProductComponent,
    ProfileComponent,
    PaymentComponent,
    FavoritesComponent,
    AddAddressComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
