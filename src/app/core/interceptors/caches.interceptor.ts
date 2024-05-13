import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private _cache = new Map<string, { response: HttpResponse<any>, timestamp: number }>();
    private _maxCacheSize = 10;  
    private _cacheExpirationTime = 60000; // (1 minute)

    constructor(private errorService: ErrorService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.errorService.setError(null);

        if (request.method !== 'GET') {
            return next.handle(request);
        }

        
        const cachedResponse = this._cache.get(request.urlWithParams);

        // If there's a cached response and it's not expired, return it
        if (cachedResponse && Date.now() - cachedResponse.timestamp < this._cacheExpirationTime) {
            return of(cachedResponse.response);
        }

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    // Cache the response
                    this._cache.set(request.urlWithParams, { response: event, timestamp: Date.now() });

                    if (this._cache.size > this._maxCacheSize) {
                        const oldestKey = this.getOldestCacheKey();
                        this._cache.delete(oldestKey);
                    }
                }
            })
        );
    }

    // Helper function to get the key of the oldest cached response
    private getOldestCacheKey(): string {
        let oldestKey = '';
        let oldestTimestamp = Number.MAX_VALUE;

        this._cache.forEach((value, key) => {
            if (value.timestamp < oldestTimestamp) {
                oldestKey = key;
                oldestTimestamp = value.timestamp;
            }
        });

        return oldestKey;
    }
}
