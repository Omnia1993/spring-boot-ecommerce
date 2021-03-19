import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;


  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[];
  creditCardMonths: number[];

  constructor(private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService) { }
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({

        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']

      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']

      })

    });

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months:" + JSON.stringify(data))
        this.creditCardMonths = data;


      }
    );
  
    //populate credit card year
    this.luv2ShopFormService.getCreditCardYear().subscribe(
      
      
      data => {
        console.log("Retrieved credit card Year" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
  }
  copyShippingAddressToBillingAdress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)

    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
  onSubmit() {
    console.log("handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("the email adress is " + this.checkoutFormGroup.get('customer').value.email);

  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear:number = Number(creditCardFormGroup.value.expirationYear);
   
    //if the current year equals the s elected year,the start with current month
    let startMonth: number;
    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }

    else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("retrieved credit card month months:" + JSON.stringify(data));
        this.creditCardMonths = data;
        console.log("seleccccted" + Number(creditCardFormGroup.value.expirationYear));
        console.log("xxxxxxxx"+ selectedYear,"yyyyy"+ currentYear)
      }
    
    );
    
  }
  
  
}
