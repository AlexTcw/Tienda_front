import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dynamic-card',
  template: `
    <div class="product-container" style="position: relative; display: flex; flex-direction: column; align-items: center;">
      <div [ngStyle]="{
        'background-color': color,
        'width': '100%',
        'height': '150px',
        'border-radius': '8px',
        'box-shadow': '5px 5px 5px black',
        'margin-bottom': '10px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'overflow': 'hidden',
      }">
        <img [src]="'assets/' + image" alt="product_image"
             style="max-width: 80%; max-height: 80%; object-fit: contain;
             border-radius: 10px; box-shadow: 3px 3px 3px black; ">
      </div>
      <div style=" font-size: 16px; margin-bottom: 5px;">
        {{ title }}
      </div>
      <div style="font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
        $ {{ price }} MXN
        <button style="margin-left: 40px" mat-raised-button
                [disabled]="stock === 0"
                color="primary"
                (click)="onAddClick()">
          <span style="margin-right: 5px;">🛍</span> Add
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
  styleUrls: ['../components/products/products.component.scss']
})
export class DynamicCardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() color: string = '#333';
  @Input() image: string = "example.jpg";
  @Input() stock: number = 0;

  @Output() addClicked = new  EventEmitter<number>();

  onAddClick(){
    this.addClicked.emit(Number(this.id));
  }
}
