import { GifsService } from './../services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  constructor(
    private gifService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get results(): any[] {
    return this.gifService.results;
  }

}
