import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in pur cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(temCartItem => temCartItem.id === theCartItem.id)

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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem)
    }
    else {
      this.computeCartTotals();

    }
  }
  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(temCartItem => temCartItem.id === theCartItem.id);
    // if found ,remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}