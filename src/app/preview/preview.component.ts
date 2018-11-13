import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';
import { PlayerService } from '../shared/player.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';
  clipStart = 0;
  clipEnd: number;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.videoDuration.subscribe(
      (videoDuration: number) => this.clipEnd = videoDuration
    );
  }
  pauseVideo() {
    console.log('pausar');
  }

}
