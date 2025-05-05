import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductsComponent} from "./components/products/products.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {CartComponent} from "./components/cart/cart.component";
import {KpisComponent} from "./components/kpis/kpis.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'kpis',component: KpisComponent},
      { path: 'cart', component: CartComponent},
    ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
