import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-edit-product-dialog',
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
    <h1 mat-dialog-title>Editar producto</h1>

    <form (ngSubmit)="save()" #editForm="ngForm">
      <div mat-dialog-content>
        <mat-form-field class="full-width">
          <mat-label>Nombre del producto:</mat-label>
          <input matInput placeholder="Oro" [(ngModel)]="product.name" name="name" required />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Precio del producto:</mat-label>
          <input matInput placeholder="Oro" [(ngModel)]="product.price" name="price" required />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Marca:</mat-label>
          <input matInput placeholder="TIFFANY & CO" [(ngModel)]="product.brand" name="brand" required />
        </mat-form-field>
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
export class EditProductDialogComponent implements OnInit {

  product:any;

  constructor(private dialogRef: MatDialogRef<EditProductDialogComponent>,
              private productService: ProductsService,
              @Inject(MAT_DIALOG_DATA) public id: any,) { }

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe(
      product => {
        this.product = product;
      }
    );
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

        const consumeProduct = {
          productID: this.id,
          name: this.product.name,
          description: this.product.description,
          brand: this.product.brand,
          price: this.product.price,
          stock: this.product.stock
        };

        this.productService.updateProduct(consumeProduct).subscribe({
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
