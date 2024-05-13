import { Component, Output, EventEmitter, DestroyRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');

  constructor(private _destroyRef: DestroyRef) {
    this.searchControl.valueChanges
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(500),
      distinctUntilChanged()
    )
      .subscribe(value => {
        (/^[1-9][0-9]*$/.test(value)) && this.searchChange.emit(value);
    });
  }


  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchChange.emit('');
  }
}
