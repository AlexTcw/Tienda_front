import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DynamicCardCartComponent} from "../../../model/DynamicCardCartComponent";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-create-cart-dialog',
  styles: [`
    .full-width {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: stretch;
    }

    .actions button {
      flex: 1;
    }
  `],
  template: `
    <h1 mat-dialog-title>Productos en el carrito</h1>

    <form #cartForm="ngForm">
      <div mat-dialog-content>
        <div class="body-container">
          <ng-template #container></ng-template>
        </div>
      </div>

      <div mat-dialog-actions class="actions">
        <button mat-flat-button color="warn" type="button" (click)="close()">Cerrar</button>
        <button mat-flat-button color="accent" type="button" (click)="goToCart()">Ver más</button>
        <button mat-flat-button color="primary" type="button" (click)="saveCart()">Guardar</button>
      </div>
    </form>
  `
})
export class CreateCartDialogComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  constructor(private dialogRef:MatDialogRef<CreateCartDialogComponent>,
              private componentFactoryResolver: ComponentFactoryResolver,
              private router:Router,
              private cartService:CartService) {
  }

  ngOnInit(): void {
    this.drawCart();
  }

  close() {
    this.dialogRef.close();
  }

  drawCart(){
    const cart = JSON.parse(String(localStorage.getItem('cart')));
    const products: any[] = cart.products;
    console.log(cart);
    const cardFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicCardCartComponent);
    this.container.clear();
    products.forEach(product => {
      const componentRef = this.container.createComponent(cardFactory);
      componentRef.instance.id = product.value1
      componentRef.instance.quantity = product.value2
      componentRef.instance.name = product.name
      componentRef.instance.price = product.price

      componentRef.instance.deleteClicked.subscribe((id: number) => {
        this.deleteProductFromLocalStorage(id)
      });
      componentRef.instance.quantityChanged.subscribe(({ id, quantity }) => {
        this.updateQuantityFromLocalStorage(id, quantity);
      });
    });

  }

  deleteProductFromLocalStorage(id: number) {
    const cart = JSON.parse(String(localStorage.getItem('cart')));
    cart.products = cart.products.filter((p: any) => p.value1 !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.drawCart();
  }

  updateQuantityFromLocalStorage(id: number,quantity: number) {
    const cart = JSON.parse(String(localStorage.getItem('cart')));
    const product = cart.products.find((p: any) => p.value1 === id);
    if (product) {
      product.value2 = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  saveCart(){
    const cart = JSON.parse(String(localStorage.getItem('cart')));
    const products: any[] = cart.products
    const consumeCart = {
      userId: cart.userId,
      products: products.map(p => ({
        value1: p.value1,
        value2: p.value2
      }))
    };

    this.cartService.createCart(consumeCart).subscribe(() => {
      localStorage.removeItem('cart');
      this.close();
      this.goToCart();
    })

  }

  goToCart(){
    this.router.navigate(['/home/cart']).then(() => {});
  }
}
