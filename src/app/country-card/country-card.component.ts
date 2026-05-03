import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Country } from '../services/country.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
  @Input() country!: Country;
  @Output() click = new EventEmitter<Country>();

  onCardClick(): void {
    this.click.emit(this.country);
  }
}
