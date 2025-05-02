import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  template: `
    <div class="product-container"
         style="position: relative; display: flex; flex-direction: row; align-items: center;
         justify-content: space-between;">
      <div [ngStyle]="{
    'background-color': color,
    'width': '150px',
    'height': '150px',
    'border-radius': '8px',
    'box-shadow': '5px 5px 5px black',
    'margin-right': '15px',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'overflow': 'hidden',
    'margin-bottom': '10px',
  }">
        <img [src]="'assets/' + image" alt="product_image"
             style="max-width: 80%; max-height: 80%; object-fit: contain;
         border-radius: 10px; box-shadow: 3px 3px 3px black;">
      </div>
      <div style="display: flex; flex-direction: column; width: 80%">
        <div style="font-size: 16px; margin-bottom: 5px;">
          {{ title }}
        </div>
        <div style="font-size: 18px; display: flex; flex-direction: row; margin-left: 10px">
          <div style="display: flex; flex-direction: column; margin-left: 20px; align-items: center">
            <mat-label>SKU: </mat-label>
            <div>{{ sku }}</div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; margin-left: 20px">
            <mat-label>Brand: </mat-label>
            <div>{{ brand }}</div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; margin-left: 20px">
            <mat-label>Stock: </mat-label>
            <div>{{ stock }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../components/inventory/inventory.component.scss'],
})
export class DynamicCardInventory {
  @Input() title: string = '';
  @Input() color: string = '#333';
  @Input() image: string = "example.jpg";
  @Input() sku: string = 'Sku';
  @Input() description: string = '';
  @Input() brand: string = '';
  @Input() stock: number = 0;
}
