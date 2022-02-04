import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ]
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder: string = 'Buscar';

  @Output() cleanSearch = new EventEmitter();

  icons = {
    search: faSearch,
    times: faTimes,
  }
  value: string = '';
  isDisabled: boolean;
  onChange = (_:any) => { }
  onTouch = () => { }

  constructor() { }

  ngOnInit(): void {
  }

  typingSearchEmit() {
    this.onTouch();
    this.onChange(this.value);
  }

  restSearch() {
    this.value = '';
    this.cleanSearch.emit('');
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
