import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Input() placeholderText: String = '';
  @Output() searchSubmit = new EventEmitter<string>();

  emitSearch(value: string): void {
    this.searchSubmit.emit(value);
  }
}
