import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ProductsService} from "../../services/products.service";
import {DynamicCardInventory} from "../../model/DynamicCardInventory";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";
import {EditProductDialogComponent} from "../dialog/edit-product-dialog/edit-product-dialog.component";
import {RefillProductDialogComponent} from "../dialog/refill-product-dialog/refill-product-dialog.component";
import {AddProductDialogComponent} from "../dialog/add-product-dialog/add-product-dialog.component";
import {map, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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
              private productService:ProductsService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Sanitizar el HTML generado
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.card_generated);
    this.getAllProducts('');
    this.insertDynamicCard();
    this.verifyStock().subscribe((result: boolean) => {
      if (result) {
        this.openSnackbar()
      }
    });
  }

  insertDynamicCard() {
    const cardFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicCardInventory);
    this.container.clear();

    this.productList.forEach(product => {
      const componentRef = this.container.createComponent(cardFactory);
      componentRef.instance.title = product.name;
      componentRef.instance.color = this.generatePastelColor();
      componentRef.instance.stock = product.stock;
      componentRef.instance.brand = product.brand;
      componentRef.instance.sku = product.sku;
      componentRef.instance.image = product.image || 'assets/arete-example.webp';
      componentRef.instance.description = product.description || '';
      componentRef.instance.id = product.productID || '';

      componentRef.instance.editClicked.subscribe((id: number) => {
        this.editProduct(id)
      });

      componentRef.instance.deleteClicked.subscribe((id: number) => {
        this.deleteProduct(id)
      });

      componentRef.instance.refillClicked.subscribe((id: number) => {
        this.refillProduct(id)
      });

    });

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

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Advertencia',
      text: `¿Segura que quieres borrar el producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar"
    }).then((r) => {
      if (r.isConfirmed){
        this.productService.deleteProductById(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Borrado!",
              text: "El producto ha sido borrado.",
              icon: "success"
            }).then(() => {
              this.ngOnInit()
            });
          },
          error: error => {
            console.error('Error fetching products:', error);
            this.productList = [];
          }
        });
      }
    });
  }

  editProduct(id: number) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  refillProduct(id: number) {
    const dialogRef = this.dialog.open(RefillProductDialogComponent, {
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  openSnackbar() {
    this._snackBar.open('Algunos productos se quedaron sin stock', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '800px'
    });
  }

  verifyStock(): Observable<boolean> {
    return this.productService.getOutOfStockProducts().pipe(
      map(response => {
        const products = response?.responseJsonProducts || [];
        return products.length > 0;
      })
    );
  }




}
