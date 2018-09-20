import { Component } from '@angular/core';

import { Listings, Ticker } from './coinmarket';
import { CoinmarketService } from './coinmarket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoinMarket';
  listings: Listings[];
  ticker: Ticker[];

  constructor(private coinmarketService: CoinmarketService) { }

  ngOnInit() {
    this.listings = [new Listings()];
    this.ticker = [new Ticker()];

    this.getListings();
    this.getTicker();
  }

  getListings(): void {
    this.coinmarketService.getListings()
      .subscribe(listings => this.listings = listings);
  }

  getTicker(): void {
    this.coinmarketService.getTicker('20')
      .subscribe(ticker => this.ticker = ticker);
  }
}
