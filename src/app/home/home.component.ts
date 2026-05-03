import { Component, OnInit } from '@angular/core';
import { CountryService, Country } from '../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load countries. Please try again later.';
        this.loading = false;
        console.error('Error loading countries:', err);
      }
    });
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredCountries = this.countries;
      return;
    }

    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onFilterRegion(region: string): void {
    if (region === 'all') {
      this.filteredCountries = this.countries;
    } else {
      this.filteredCountries = this.countries.filter(country =>
        country.region.toLowerCase() === region.toLowerCase()
      );
    }
  }

  onCountryClick(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  }
}
