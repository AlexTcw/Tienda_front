import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  template: `
    <div class="card" [ngStyle]="{ 'background-color': color,
    'display': 'flex', 'padding': '10px', 'margin-top':'10px', 'border-radius': '10px',
    'box-shadow': '2px 2px 4px #000000'}">
      <div class="img-container">
        <img [src]="image" alt="{{ title }}" style="border-radius: 10px; width: 7rem; align-content: center"/>
      </div>
      <div class="card-content" style="margin-left: 5rem; width: 58%">
        <h3>{{ title }}</h3>
        <div class="tag-container" style="display: flex; flex-direction: row">
          <p><strong>SKU:</strong> {{ sku }}</p>
          <p style="margin-left: 20px"><strong>Marca:</strong> {{ brand }}</p>
          <p style="margin-left: 20px"><strong>Stock:</strong> {{ stock }}</p>
        </div>
        <p>{{ description }}</p></div>
      <div class="button-container" style="margin-left: 20px; align-content: center">
        <button mat-fab aria-label="edit product" (click)="onEditClick()"
                matTooltip="Editar producto"
                style="margin-left: 10px; width: 56px; height: 56px; border-radius: 6px; background-color: #4CAF50; color: white;">
          <mat-icon>edit</mat-icon>
        </button>

        <button mat-fab aria-label="delete product" (click)="onDeleteClick()"
                matTooltip="Borrar producto"
                style="margin-left: 10px; width: 56px; height: 56px; border-radius: 6px; background-color: #F44336; color: white;">
          <mat-icon>delete</mat-icon>
        </button>

        <button mat-fab aria-label="refill product" (click)="onRefillClick()"
                matTooltip="Ajustar existencias del producto"
                style="margin-left: 10px; width: 56px; height: 56px; border-radius: 6px; background-color: #ffdf88; color: #000000;">
          <mat-icon>exposure_plus_1</mat-icon>
        </button>

        <mat-icon
          *ngIf="stock === 0"
          style="color: black; margin-left: 10px"
          matTooltip="No quedan existencias del producto">
          warning
        </mat-icon>

      </div>
    </div>
  `,
  styleUrls: ['../components/inventory/inventory.component.scss'],
})
export class DynamicCardInventory {
  @Input() title: string = '';
  @Input() color: string = '#333';
  @Input() image: string = 'example.jpg';
  @Input() sku: string = 'Sku';
  @Input() description: string = '';
  @Input() brand: string = '';
  @Input() stock: number = 0;
  @Input() id: number = 0;

  @Output() editClicked = new EventEmitter<number>();
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() refillClicked = new EventEmitter<number>();

  onEditClick(){
    this.editClicked.emit(Number(this.id));
  }

  onDeleteClick(){
    this.deleteClicked.emit(Number(this.id));
  }

  onRefillClick(){
    this.refillClicked.emit(Number(this.id));
  }
}


