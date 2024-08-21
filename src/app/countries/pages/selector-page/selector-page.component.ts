import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent {



  public myForm:FormGroup = this.fb.group({
    region:['',Validators.required],
    coountry:['',Validators.required],
    limites:['',Validators.required],

  })

  constructor(
    private fb : FormBuilder,
    private countriesServices: CountriesService
  ){}


  public get regions() : Region[] {
    return this.countriesServices.region;
  }



}
