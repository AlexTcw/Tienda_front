import {Component, Input} from '@angular/core';
import {FF_MINUS} from "@angular/cdk/keycodes";

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
      <div style="font-size: 18px; margin-bottom: 10px;">
        $ {{ price }} MXN
        <button style="margin-left: 40px" mat-raised-button color="primary">
          <span style="margin-right: 5px;">🛍</span> Add
        </button>
      </div>
    </div>

  `,
  styleUrls: ['../components/products/products.component.scss']
})
export class DynamicCardComponent {
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() color: string = '#333';
  @Input() image: string = "example.jpg";
}
