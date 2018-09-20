import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Listings, Ticker } from './coinmarket';


@Injectable({
  providedIn: 'root'
})
export class CoinmarketService {

  private baseUrl = 'https://api.coinmarketcap.com/v2/';
  private listingsUrl = this.baseUrl + 'listings/';
  private tickerUrl = this.baseUrl + 'ticker/';

  constructor(private http: HttpClient) { }

  private log(msg: string) {
    console.log(new Date() + ": "
      + JSON.stringify(msg));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getListings(): Observable<Listings[]> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Accept', 'application/json'),
    };
    return this.http.get<Listings[]>(this.listingsUrl, httpOptions)
      .pipe(
        tap(listings => this.log(`Fetched listings`)),
        catchError(this.handleError('getListings', []))
      );
  }

  getTicker(limit: string): Observable<Ticker[]> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Accept', 'application/json'),
      params: new HttpParams()
        .set('limit', limit)
        .set('sort', 'id')
        .set('structure', 'array')
    };
    return this.http.get<Ticker[]>(this.tickerUrl, httpOptions)
      .pipe(
        tap(listings => this.log(`Fetched ticker`)),
        catchError(this.handleError('getTicker', []))
      );
  }
}
