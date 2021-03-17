import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handle to the cart  items
    this.cartItems = this.cartService.cartItems;

    // suscribe to the cart totalPrice


    // subscribe to the  cart totalQuantity

    // compute cart total price and quantity
  }

}
