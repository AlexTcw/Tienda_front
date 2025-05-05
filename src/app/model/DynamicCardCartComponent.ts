import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {DynamicCardComponent} from "./DynamicCardComponent";

@Component({
  selector: 'app-dynamic-card',
  styles: [
    `
      .main-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 2px;
      }

      .actions-container, .price-container {
        margin-left: auto;
      }

      .price-container {
        display: flex;
        flex-direction: row;
        min-width: 100px;
        padding: 2px;
      }

      .name-container {
        width: 100px;
      }

      input {
        width: 30px;
        margin-right: 5px;
      }
    `
  ],
  template: `
    <div class="main-container">
      <div class="name-container">{{name}}</div>
      <div class="price-container">
        <div><input [value]="quantity" min=1 type="number" (input)="onQuantityChanged($event)"/></div>
        <div> $ {{price}}</div>
      </div>
      <div class="actions-container">
        <button mat-flat-button color="accent" (click)="onDeleteClick()"><mat-icon>delete</mat-icon></button></div>
    </div>
  `,
})
export class DynamicCardCartComponent {

  constructor() {
  }

  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() quantity: number = 0;
  @Input() price: number = 0;

  @Output() deleteClicked = new EventEmitter<number>();
  @Output() quantityChanged = new EventEmitter<{ id: number, quantity: number }>();

  onDeleteClick(): void {
    this.deleteClicked.emit(this.id);
  }

  onQuantityChanged(event: Event): void {
    const parsedQuantity = Number((event.target as HTMLInputElement).value);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      this.quantityChanged.emit({ id: this.id, quantity: parsedQuantity });
      console.log(parsedQuantity);
      console.log(this.id);
    }
  }


}
