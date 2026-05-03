import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService, Country } from '../services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country: Country | null = null;
  borderCountries: Country[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    if (countryName) {
      this.loadCountryDetails(countryName);
    } else {
      this.error = 'Country not found';
      this.loading = false;
    }
  }

  loadCountryDetails(name: string): void {
    this.loading = true;
    this.borderCountries = []; // Reset border countries for new country
    this.countryService.getCountryByName(name).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.country = data[0];
          this.loadBorderCountries();
        } else {
          this.error = 'Country not found';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load country details. Please try again later.';
        this.loading = false;
        console.error('Error loading country details:', err);
      }
    });
  }

  loadBorderCountries(): void {
    if (!this.country?.borders || this.country.borders.length === 0) {
      this.loading = false;
      return;
    }

    const borderRequests = this.country.borders.map(code => 
      this.countryService.getCountryByCode(code)
    );

    Promise.all(borderRequests.map(req => req.toPromise())).then(
      (results) => {
        this.borderCountries = results.flat().filter((country): country is Country => country !== undefined);
        this.loading = false;
      },
      (error) => {
        console.error('Error loading border countries:', error);
        this.loading = false;
      }
    );
  }

  onBorderCountryClick(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  }

  onBackClick(): void {
    this.router.navigate(['/']);
  }

  getNativeName(): string {
    if (this.country?.name?.nativeName) {
      const nativeNames = Object.values(this.country.name.nativeName);
      if (nativeNames.length > 0 && nativeNames[0].common) {
        return nativeNames[0].common;
      }
    }
    return this.country?.name?.official || this.country?.name?.common || '';
  }

  getCurrencies(): string {
    if (!this.country?.currencies) return '';
    const currencies = Object.values(this.country.currencies);
    return currencies.map(currency => currency.name).join(', ');
  }

  getLanguages(): string {
    if (!this.country?.languages) return '';
    const languages = Object.values(this.country.languages);
    return languages.join(', ');
  }
}
