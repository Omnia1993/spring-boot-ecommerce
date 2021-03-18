import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    // build an array fo "month" dropdown list untill month 12
    //- start at current month and loop until month 12 

    for (startMonth; startMonth <= 12; startMonth++) {
      data.push(startMonth)
    }
    return of(data);

  }


  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];

    //build an array for "year" downlist 
    //- start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {


    }
    return of(data);


  }
}
