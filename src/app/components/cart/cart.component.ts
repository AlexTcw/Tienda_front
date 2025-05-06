import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {DynamicCardComponent} from "../../model/DynamicCardComponent";
import {DynamicCardCartsComponent} from "../../model/DynamicCardCartsComponent";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cartService: CartService) {}

    ngOnInit(): void {
    }

    generatePastelColor() {
    const hue = Math.floor(Math.random() * 360); // tono aleatorio
    const saturation = 60 + Math.random() * 20; // 60% a 80% saturación
    const lightness = 75 + Math.random() * 10; // 75% a 85% luminosidad

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    drawCarts(keyword:string){
      let carts:any[] = [];
      this.cartService.findCartByKeyword(keyword).subscribe((data: any) => {
        carts = data;
      })

      const cardFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicCardCartsComponent);
      this.container.clear();
      carts.forEach(cart => {
        const componentRef = this.container.createComponent(cardFactory);
      })
    }



}
