import { Component, OnInit } from '@angular/core';
import { ClipService } from 'src/app/shared/clip.service';

@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.css']
})
export class SearchTagComponent implements OnInit {

  constructor(private clipService: ClipService) { }

  ngOnInit() {
  }
  handleFilter(event) {
    const input = event.target.value;
    this.clipService.filterClipsByTag(input);
  }
}
