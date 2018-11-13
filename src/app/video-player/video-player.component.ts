import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ClipService } from '../shared/clip.service';
import { Clip } from '../shared/clip.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

export class VideoPlayerComponent implements OnInit {
  @Input() playerType: string;
  @Input() clip: Clip;

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  upperStart: boolean;
  upperEnd: boolean;
  videoDuration: number;
  iconPlayPause = 'fa-play';

  clipStartInput: number;
  clipEndInput: number;

  constructor(private clipService: ClipService) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
    if (this.playerType === 'edit') {
      const clip = this.clip;
      this.clipStartInput = clip.start;
      this.clipEndInput = clip.end;
      this.video.currentTime = clip.start;
    }
  }
  seekVideo(typeOfInput) {
    if (typeOfInput === 'start') {
      if (this.clipStartInput >= this.clipEndInput) {
        this.clipStartInput = this.clipEndInput - 1 ;
      }
      const startInput = this.clipStartInput;
      this.video.currentTime = startInput;
    } else {
      if (this.clipEndInput < this.clipStartInput) {
        this.clipEndInput = this.clipStartInput + 1 ;
      }
      const endInput = this.clipEndInput;
      this.video.currentTime = endInput;
    }
  }
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.videoDuration = this.video.duration;
    if (this.playerType === 'create') {
      this.clipStartInput = 0;
      this.clipEndInput = this.videoDuration;
    }
  }
  togglePlay() {
    const video = this.video;
    if (video.paused) {
      // Replays at start Input position
      /* video.currentTime = this.clipStartInput; */
      this.video.play();
      this.iconPlayPause = 'fa-pause';
    } else {
      video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }
  updateSelectors () {
    const ct = this.video.currentTime;
    // Just updates the slider when is playing from the start point
    if (Math.floor(ct) <= this.clipStartInput + 0.4 ) {
      this.clipStartInput = ct;
    } else {
      this.clipEndInput = ct;
    }
    if (Math.floor(ct) === this.clipEndInput - 1 ) {
      this.video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }
  trackMousePosition(event) {
    const hoverOnPercent = event.offsetX / event.target.clientWidth;
    const lowerValue = this.clipStartInput;
    const upperValue = this.clipEndInput;
    const closeValue = this.videoDuration / 10;
    if (
      upperValue - lowerValue < closeValue &&
      upperValue > this.videoDuration * .9
    ) {
      this.upperStart = true;
      this.upperEnd = false;
    } else if (
      upperValue - lowerValue < closeValue &&
      lowerValue < this.videoDuration * .1
    ) {
      this.upperStart = false;
      this.upperEnd = true;
    } else {
      const middleValue = lowerValue + (upperValue - lowerValue) / 2;
      if (hoverOnPercent < middleValue / this.videoDuration) {
        this.upperStart = true;
        this.upperEnd = false;
      } else {
        this.upperStart = false;
        this.upperEnd = true;
      }
    }
  }

}
