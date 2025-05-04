import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../../../services/products.service";
import Swal from "sweetalert2";

interface Product {
  name: string;
  description: string;
  price: number;
  categories: number[];
  brand: string;
  stock: number;
}

@Component({
  selector: 'app-add-product-dialog',
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
    <h1 mat-dialog-title>Añadir <strong>nuevo</strong> producto</h1>
    <form (ngSubmit)="save()" #editForm="ngForm">
      <div mat-dialog-content>
        <div style="display: flex; flex-direction: row">
          <mat-form-field class="full-width">
            <mat-label>Nombre del producto:</mat-label>
            <input matInput placeholder="Oro" [(ngModel)]="product.name" name="name" required />
          </mat-form-field>
          <mat-form-field class="full-width" style="margin-left: 2px; width: 20%">
            <mat-label>Precio</mat-label>
            <input matInput type="number" min="0" [(ngModel)]="product.price" name="price" required />
          </mat-form-field>
        </div>
        <div style="display: flex; flex-direction: row">
        <mat-form-field class="full-width">
          <mat-label>Marca:</mat-label>
          <input matInput placeholder="TIFFANY & CO" [(ngModel)]="product.brand" name="brand" required />
        </mat-form-field>
          <mat-form-field class="full-width" style="margin-left: 2px; width: 20%">
            <mat-label>Stock</mat-label>
            <input matInput type="number" min="0" [(ngModel)]="product.stock" name="stock" required />
          </mat-form-field>
      </div>
        <mat-form-field class="full-width">
          <mat-label>Descripción:</mat-label>
          <textarea matInput placeholder="Ex. It makes me feel..." [(ngModel)]="product.description" name="description" required></textarea>
        </mat-form-field>
      </div>

      <div mat-dialog-actions class="actions">
        <button mat-flat-button color="warn" type="button" (click)="close()">Cerrar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="!editForm.valid">Guardar</button>
      </div>
    </form>
  `
})
export class AddProductDialogComponent implements OnInit {

    product: Product = {
      name: '',
      description: '',
      price: 0.0,
      categories: [1,2],
      brand: '',
      stock: 0
    };

    ngOnInit(): void {
    }

    constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>,
                private productService: ProductsService) {
    }

    close() {
      this.dialogRef.close();
    }

    save(){
      Swal.fire({
        title: "Deseas guardar los cambios",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `Descartar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {


          this.productService.addProduct(this.product).subscribe({
              next: () => {
                Swal.fire({
                  title: "Cambios guardados",
                  icon: "success",
                }).then(() => {
                  this.close();
                });
              },error(){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Algo salio mal",
                }).then(() => {});
              }
            }
          )

          Swal.fire("Cambios guardados", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Cambios descartados", "", "info");
        } else if(result.isDismissed){
          this.close()
        }
      });
    }

}
