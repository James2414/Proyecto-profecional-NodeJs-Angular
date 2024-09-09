import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { IndexProductoComponent } from "./components/index-producto/index-producto.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";


const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cuenta/perfil', component: PerfilComponent},



    //espacio para las otras rutas que faltan
    {path: 'productos', component: IndexProductoComponent}

    
]

export const appRoutingProviders : any[]=[]
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute);

