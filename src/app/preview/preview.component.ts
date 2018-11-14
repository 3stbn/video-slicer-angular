import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { Clip } from '../shared/clip.model';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  videoSource = 'https://media.w3.org/2010/05/sintel/trailer.mp4';
  clipStart = 0;
  clipEnd: number;
  playType = 'default';
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.videoDuration.subscribe(
      (videoDuration: number) => this.clipEnd = videoDuration
    );
    this.playerService.playClip.subscribe(
      (clip: Clip) => {
        this.clipStart = clip.start;
        this.clipEnd = clip.end;
        this.videoSource = `https://media.w3.org/2010/05/sintel/trailer.mp4#t=${clip.start},${clip.end}`;
        this.playType = 'clip';
      }
    );
  }
  pauseVideo() {
    console.log('pausar');
  }
}
