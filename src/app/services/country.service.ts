import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { official: string; common: string } };
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  borders?: string[];
  tld: string[];
  currencies: { [key: string]: { name: string; symbol: string } };
  languages: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all?fields=name,population,region,capital,flags,cca3`);
  }

  getCountryByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${name}?fullText=true&fields=name,population,region,subregion,capital,flags,cca3,borders,tld,currencies,languages,nativeName`);
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}?fields=name,population,region,capital,flags,cca3`);
  }

  searchCountries(query: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${query}?fields=name,population,region,capital,flags,cca3`);
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}?fields=name,population,region,subregion,capital,flags,cca3,borders,tld,currencies,languages,nativeName`);
  }
}
