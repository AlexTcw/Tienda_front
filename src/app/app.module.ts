import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavBodyComponent } from './components/sidebar/sidenav-body/sidenav-body.component';
import { SidenavUtilComponent } from './components/sidebar/sidenav-util/sidenav-util.component';
import { SidenavComponent } from './components/sidebar/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { BottombarComponent } from './components/bottombar/bottombar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ProductsComponent } from './components/products/products.component';
import { LogoutComponent } from './components/logout/logout.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import {NgOptimizedImage} from "@angular/common";
import {DynamicCardComponent} from "./model/DynamicCardComponent";
import {MatPaginatorModule} from "@angular/material/paginator";
import { CartComponent } from './components/cart/cart.component';
import {DynamicCardInventory} from "./model/DynamicCardInventory";
import { KpisComponent } from './components/kpis/kpis.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditProductDialogComponent } from './components/dialog/edit-product-dialog/edit-product-dialog.component';
import { RefillProductDialogComponent } from './components/dialog/refill-product-dialog/refill-product-dialog.component';
import { AddProductDialogComponent } from './components/dialog/add-product-dialog/add-product-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CreateCartDialogComponent } from './components/dialog/create-cart-dialog/create-cart-dialog.component';
import {DynamicCardCartComponent} from "./model/DynamicCardCartComponent";
import {DynamicCardCartsComponent} from "./model/DynamicCardCartsComponent";

@NgModule({
  declarations: [
    AppComponent,
    SidenavBodyComponent,
    SidenavUtilComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent,
    BottombarComponent,
    ProductsComponent,
    LogoutComponent,
    InventoryComponent,
    DynamicCardComponent,
    CartComponent,
    DynamicCardInventory,
    KpisComponent,
    EditProductDialogComponent,
    RefillProductDialogComponent,
    AddProductDialogComponent,
    CreateCartDialogComponent,
    DynamicCardCartComponent,
    DynamicCardCartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgOptimizedImage,
    MatPaginatorModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
