import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit {



  public myForm:FormGroup = this.fb.group({
    region:['',Validators.required],
    country:['',Validators.required],
    limites:['',Validators.required],
  })

  public countriesByRegion: SmallCountry[] = [];
  public limites:string[] = [];

  constructor(
    private fb : FormBuilder,
    private countriesServices: CountriesService
  ){}


  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }


  public get regions() : Region[] {
    return this.countriesServices.region;
  }


  public onRegionChanged = ():void => {
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.limites = []),

      switchMap(region => this.countriesServices.getCountriesByRegion(region))
    )
    .subscribe(coountries => {
      // console.log({region});
      this.countriesByRegion = coountries;
    });
  }
  public onCountryChanged = ():void => {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('limites')!.setValue('')),
      switchMap(alphaCode => this.countriesServices.getlimitsByCountry(alphaCode))
    )
    .subscribe(countries => {
      // console.log({limites: countries.borders});
      this.limites = countries.borders;
    });
  }



}
