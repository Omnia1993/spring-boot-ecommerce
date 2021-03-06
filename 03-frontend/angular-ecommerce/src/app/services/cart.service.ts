import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in pur cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id

      for (let temCartItem of this.cartItems)
        if (temCartItem.id == theCartItem.id) {
          existingCartItem = temCartItem;
          break;

        }
      //check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined)
    }
    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;

    }
    else {
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }
    // compute the cart total price and total quantity 
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentItem of this.cartItems) {
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;

    }
    //publish the new values... all subscribers will recive the new data 
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue)

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('content of the cart');
    for (let temCartItem of this.cartItems) {
      const subTotalPrice = temCartItem.quantity * temCartItem.unitPrice;
      console.log(`name:${temCartItem.name},quntity:${temCartItem.quantity},unitPrice=${temCartItem.unitPrice},supTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice :${totalPriceValue.toFixed(2)}, totalQuantity :${totalQuantityValue}`);
    console.log('-----');
    }
}