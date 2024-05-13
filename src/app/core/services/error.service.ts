import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public error$ = this.errorSubject.asObservable();

    setError(error: any): void {
      setTimeout(() => this.errorSubject.next(error))
    }

  
}
