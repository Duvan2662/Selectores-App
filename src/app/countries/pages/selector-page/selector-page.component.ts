import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent implements OnInit {



  public myForm:FormGroup = this.fb.group({
    region:['',Validators.required],
    coountry:['',Validators.required],
    limites:['',Validators.required],
  })

  public countriesByRegion: SmallCountry[] = [];

  constructor(
    private fb : FormBuilder,
    private countriesServices: CountriesService
  ){}


  ngOnInit(): void {
    this.onRegionChanged();
  }


  public get regions() : Region[] {
    return this.countriesServices.region;
  }


  public onRegionChanged = ():void => {
    this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap(region => this.countriesServices.getCountriesByRegion(region))
    )
    .subscribe(coountries => {
      // console.log({region});
      this.countriesByRegion = coountries;
    });
  }



}
