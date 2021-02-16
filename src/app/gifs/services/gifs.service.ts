import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from './../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private apikey = 'VJAZDQvZLvkPVHQI4AJILM7uwpgn3G38';
  private _history: string[] = [];
  public results: Gif[] = [];
  private readonly key_1 = 'gifsHistory';
  private readonly key_2 = 'latestResults';
  
  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem(this.key_1)!) || [];
    this.results = JSON.parse(localStorage.getItem(this.key_2)!) || [];
  }

  get history(): string[] {
    return [...this._history];
  }

  public searchGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    if (this._history.includes(query)) return;
    this._history = this._history.splice(0, 9);
    this._history.unshift(query);
    this.saveToLocalStorage(this.key_1, this._history);

    this.fetchGifs(query);
  }

  public fetchGifs(query: string = ''): void {
    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q', query);
    this.http
      .get<SearchGifsResponse>(
        `${this.serviceUrl}/search`, {
          params
        }
      )
      .subscribe(
        (res) => {
          const { data } = res;
          this.results = data;
          this.saveToLocalStorage(this.key_2, this.results);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  public saveToLocalStorage(keyname: string, value: any): void {
    localStorage.setItem(keyname, JSON.stringify(value));
  }
}
