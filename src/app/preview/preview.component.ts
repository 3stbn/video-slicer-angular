import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pauseVideo() {
    console.log('pausar');
  }

}
