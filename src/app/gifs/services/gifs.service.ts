import { Gif, SearchGifsResponse } from './../interface/gifs.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikey = 'VJAZDQvZLvkPVHQI4AJILM7uwpgn3G38';
  private _history: string[] = [];
  public results: Gif[] = [];
  constructor(
    private http: HttpClient
  ) { }

  get history(): string[] {
    return [...this._history];
  }

  public searchGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    if (this._history.includes(query)) return;
    this._history = this._history.splice(0, 9);
    this._history.unshift(query);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apikey}&q=${query}&limit=10`)
    .subscribe(res => {
      const { data } = res;
      this.results = data;
    }, err => {
      console.error(err)
    })
  }
}
