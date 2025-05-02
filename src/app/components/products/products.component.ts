import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DynamicCardComponent} from "../../model/DynamicCardComponent";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  htmlContent: any;
  card_generated: string = `
    <mat-card class="card-button-example">
      <mat-card-content>
        <button mat-raised-button>New</button>
      </mat-card-content>
    </mat-card>
  `;
  productList:any[] = [];
  searchText: string = '';

  constructor(private sanitizer: DomSanitizer,
              private componentFactoryResolver: ComponentFactoryResolver,
              private productService:ProductsService) { }

  ngOnInit(): void {
    // Sanitizar el HTML generado
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.card_generated);
    this.getAllProducts('');
    this.insertDynamicCard();
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
    });
  }


  addToCart(product:any) {
    localStorage.setItem("cartItems", JSON.stringify(product));
  }

}
