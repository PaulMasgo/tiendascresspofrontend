import { RouterModule,Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritocomprasComponent } from './pages/carritocompras/carritocompras.component';
import { RegisterComponent } from './pages/register/register.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ProductComponent } from './shared/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AddAddressComponent } from './pages/address/add-address/add-address.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { DetallesVentaComponent } from './pages/detalles-venta/detalles-venta.component';

const appRoutes :Routes = [
    {path:'productos',component:ProductosComponent},
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'contacto',component:ContactComponent},
    {path:'carrito',component:CarritocomprasComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent},
    {path:'payment',component:PaymentComponent},
    {path:'www',component:ProductComponent},
    {path:'verification/:id',component:VerificationComponent},
    {path:'product/:id',component:ViewproductComponent},
    {path:'addaddress/:estado',component:AddAddressComponent},
    {path:'favoritos',component:FavoritesComponent},
    {path:'updateUser',component:UpdateUserComponent},
    {path:'detalle',component:DetallesVentaComponent},
    {path: '',  redirectTo:'/home',pathMatch:'full'},
    {path:'**',component:NotfoundComponent}
    
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});

