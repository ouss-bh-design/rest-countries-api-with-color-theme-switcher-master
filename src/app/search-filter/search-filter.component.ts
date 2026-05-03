import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  @Output() search = new EventEmitter<string>();
  @Output() filterRegion = new EventEmitter<string>();

  searchTerm = '';
  selectedRegion = 'all';

  onSearchChange(): void {
    this.search.emit(this.searchTerm);
  }

  onRegionChange(): void {
    this.filterRegion.emit(this.selectedRegion);
  }

  regions = [
    { value: 'all', label: 'Filter by Region' },
    { value: 'africa', label: 'Africa' },
    { value: 'americas', label: 'Americas' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' }
  ];
}
