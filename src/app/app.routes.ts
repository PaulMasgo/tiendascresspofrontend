import { RouterModule,Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes :Routes = [
    {path:'productos',component:ProductosComponent},
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'contacto',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path: '',  redirectTo:'/home',pathMatch:'full'},
    {path:'**',component:NotfoundComponent},
    
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});

