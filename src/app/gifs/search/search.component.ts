import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  @ViewChild('searchTxt') searchTxt!: ElementRef<HTMLInputElement>;
  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  public search(): void {
    const value = this.searchTxt.nativeElement.value;
    if (value && value.trim().length === 0) return;
    this.gifsService.searchGifs(value);
    this.searchTxt.nativeElement.value = '';
  }

}
