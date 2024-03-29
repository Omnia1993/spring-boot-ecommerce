import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countriesUrl = 'http://localhost:8080/api/countries'
  private stateUrl = 'http://localhost:8080/api/states'

 

  constructor(private httpClient: HttpClient) { }
  
  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(

      map(x => x._embedded.countries)

    );
  }
  getStates(theCountryCode: String): Observable<State[]>{
    //search url
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    );
}
 


  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    // build an array fo "month" dropdown list untill month 12
    //- start at current month and loop until month 12 

    for (let theMonth=startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth)
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
      data.push(theYear);
    }
    return of(data);


  }
}
interface GetResponseCountries{

  _embedded: {
   countries: Country[];
      
}
}
interface GetResponseStates{
  _embedded: {
    
    states: State[];
  }

}
