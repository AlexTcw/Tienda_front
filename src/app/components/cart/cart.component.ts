import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    cardItems: Array<any> = [];

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    deleteItems(){
      localStorage.removeItem('cartItems');
      this.ngOnInit()
    }

    deleteItem(item:number){
      const items = localStorage.getItem("cartItems")
      this.ngOnInit()
    }

    getCartItems(): void{
      const items = localStorage.getItem("cartItems")
      if (items != null){
      }
    }



}
