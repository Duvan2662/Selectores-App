import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  private baseURL = 'https://restcountries.com/v3.1';


  private _regions : Region[] = [Region.Africa,Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http:HttpClient
  ) { }


  public get region() : Region[] {

    return[...this._regions];
  }

  public getCountriesByRegion = (region:Region): Observable<SmallCountry[]> => {
    if (!region) {
      return of([]);
    }
    const url : string = `${this.baseURL}/region/${region}?fields=cca3,name,borders`

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.map(country => ({
        name:country.name.common,
        cca3:country.cca3,
        borders:country.borders ?? []
      }))),
      tap(response => console.log({response})
      )
    );


  }

  public getCountryByAlphaCode = (alphaCode:string): Observable<SmallCountry> => {
    if (!alphaCode) {
      return of();
    }
    const url : string = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`

    return this.http.get<Country>(url)
    .pipe(
      map(country => ({
        name:country.name.common,
        cca3:country.cca3,
        borders:country.borders ?? []
      })),
      tap(response => console.log({response})
      )
    );
  }

  public getCountryLimitsByCodes = (limits: string[]): Observable<SmallCountry[]> => {
    if (!limits || limits.length === 0) {
      return of([]);
    }
    const countriesRequest : Observable<SmallCountry>[] = [];
    limits.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });


    return combineLatest(countriesRequest)

  }


}
