import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProductsService } from "../../../services/products.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-refill-product-dialog',
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
    <h1 mat-dialog-title>Reponer existencias del producto</h1>

    <form (ngSubmit)="save()" #editForm="ngForm">
      <div mat-dialog-content>
        <mat-form-field class="full-width">
          <mat-label>Cantidad actual:</mat-label>
          <input matInput type="number" [value]="product?.stock" disabled />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Cantidad a añadir:</mat-label>
          <input matInput type="number" [(ngModel)]="addStock" name="addStock"
                 [disabled]="!!subtractStock" min="1" (ngModelChange)="updatePreview()" />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Cantidad a quitar:</mat-label>
          <input matInput type="number" [(ngModel)]="subtractStock" name="subtractStock"
                 [disabled]="!!addStock" min="1" (ngModelChange)="updatePreview()" />
        </mat-form-field>

        <p *ngIf="stockPreview !== null">
          <strong>Cantidad final:</strong> {{ stockPreview }}
        </p>
      </div>

      <div mat-dialog-actions class="actions">
        <button mat-flat-button color="warn" type="button" (click)="close()">Cerrar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="!addStock && !subtractStock">Guardar</button>
      </div>
    </form>
  `
})
export class RefillProductDialogComponent implements OnInit {
  product: any;
  addStock: number | null = null;
  subtractStock: number | null = null;
  stockPreview: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<RefillProductDialogComponent>,
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe(product => {
      this.product = product;
      this.stockPreview = product.stock;
    });
  }

  updatePreview(): void {
    if (!this.product) return;

    let preview = this.product.stock;

    if (this.addStock) {
      preview += this.addStock;
    } else if (this.subtractStock) {
      preview -= this.subtractStock;
    }

    this.stockPreview = Math.max(preview, 0);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    Swal.fire({
      title: "¿Deseas guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: "Descartar"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = {
          productID: this.id,
          name: this.product.name,
          description: this.product.description,
          brand: this.product.brand,
          price: this.product.price,
          stock: this.stockPreview
        };

        this.productService.updateProduct(updatedProduct).subscribe({
          next: () => {
            Swal.fire("Cambios guardados", "", "success").then(() => this.close());
          },
          error: () => {
            Swal.fire("Error", "Algo salió mal", "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios descartados", "", "info");
      } else if (result.isDismissed) {
        this.close();
      }
    });
  }
}
