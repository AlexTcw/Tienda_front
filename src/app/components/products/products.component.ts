import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DynamicCardComponent} from "../../model/DynamicCardComponent";
import {ProductsService} from "../../services/products.service";
import {Router} from "@angular/router";
import {EditProductDialogComponent} from "../dialog/edit-product-dialog/edit-product-dialog.component";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";
import {CreateCartDialogComponent} from "../dialog/create-cart-dialog/create-cart-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  productList:any[] = [];
  searchText: string = '';
  countItems: number = 0;
  cart: { value1: number, value2: number, name: string, price: number }[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private productService:ProductsService,
              private router: Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    // Sanitizar el HTML generado
    this.getAllProducts('');
    this.insertDynamicCard();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      this.cart = parsedCart.products || [];
    }
//    this.getAllProducts('');
    //this.openCreateCartDialog()
  }

  onSearchChange(value: string) {
    this.getAllProducts(value);
    this.insertDynamicCard();
  }

  getAllProducts(keyword:string) {
    return this.productService.findProductByKeyWord(keyword).subscribe({
      next: data => {
        if (data && data.responseJsonProducts) {
          this.productList = [...data.responseJsonProducts];
          // Aquí llamas a insertDynamicCard una vez que los productos estén listos
          this.insertDynamicCard();
        } else {
          console.error('No response or invalid structure:', data);
          this.productList = [];
        }
      },
      error: error => {
        console.error('Error fetching products:', error);
        this.productList = [];
      }
    });
  }

  generatePastelColor() {
    const hue = Math.floor(Math.random() * 360); // tono aleatorio
    const saturation = 60 + Math.random() * 20; // 60% a 80% saturación
    const lightness = 75 + Math.random() * 10; // 75% a 85% luminosidad

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  insertDynamicCard() {
    const cardFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicCardComponent);
    this.container.clear();

    this.productList.forEach(product => {
      const componentRef = this.container.createComponent(cardFactory);
      componentRef.instance.title = product.name;
      componentRef.instance.price = product.price;
      componentRef.instance.color = this.generatePastelColor();
      componentRef.instance.stock = product.stock;
      componentRef.instance.id = product.productID;

      componentRef.instance.addClicked.subscribe((productId: number) => {
        this.addToCart(Number(productId), String(product.name), Number(product.price));
      });
    });
  }

  addToCart(id: number, name: string, price: number) {
    const existingProduct = this.cart.find(p => p.value1 === id);
    if (existingProduct) {
      existingProduct.value2 += 1;
    } else {
      this.cart.push({ value1: id, value2: 1, name:name, price: price });
    }

    const consumeCart = {
      userId: localStorage.getItem("userId"),
      products: this.cart
    };

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(consumeCart));

    console.log('Carrito actualizado:', this.cart);
    this.countItems = this.cart.reduce((total, item) => total + item.value2, 0);
  }

  goToCart() {
    this.router.navigate(['/home/cart']).then(() => {});
  }

  openCreateCartDialog() {
    const dialogRef = this.dialog.open(CreateCartDialogComponent, {
      width: '400px',
      position: { bottom: '10px', right: '10px' },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
