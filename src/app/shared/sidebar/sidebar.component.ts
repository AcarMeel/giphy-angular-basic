import { GifsService } from './../../gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get history(): string[] {
    return this.gifsService.history;
  }

  public searchGif(item: string): void {
    this.gifsService.fetchGifs(item);
  }

}
