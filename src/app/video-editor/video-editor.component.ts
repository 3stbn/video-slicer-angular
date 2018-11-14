import { Component, OnInit, ViewChild, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';
import { Clip } from '../shared/clip.model';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.css']
})
export class VideoEditorComponent implements OnInit, OnChanges {
  @Input() playerType: string;
  @Input() clip: Clip;

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  @ViewChild('trackerBetween') trackerBetweenRef: ElementRef;

  upperStart: boolean;
  upperEnd: boolean;
  videoDuration: number;
  iconPlayPause = 'fa-play';
  metadataLoaded: boolean;

  @Input() clipStartInput: number;
  @Input() clipEndInput: number;

  constructor(private playerService: PlayerService, private renderer: Renderer2) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
    if (this.playerType === 'edit') {
      const clip = this.clip;
      this.clipStartInput = clip.start;
      this.clipEndInput = clip.end;
      this.video.currentTime = clip.start;
    }
  }
  ngOnChanges() {
    if (this.metadataLoaded === true) {
      this.updateTrackerBetween();
    }
  }
  onStartChanges(event) {
    this.playerService.onChangedLowerRange.next(event);
    this.video.currentTime = this.clipStartInput;
  }
  onEndChanges(event) {
    this.playerService.onChangedUpperRange.next(event);
    this.video.currentTime = this.clipEndInput;
  }
  seekVideo(typeOfInput, event) {
    const lowerValue = this.clipStartInput;
    const upperValue = this.clipEndInput;
    const maxValue = this.videoDuration;
    switch (typeOfInput) {
      case ('start'):
        if (lowerValue < 0 ) {
          event.target.value = lowerValue;
        } else if (lowerValue > upperValue) {
          event.target.value = upperValue;
        }
        break;
      case ('end'):
        if (upperValue > maxValue) {
          event.target.value = maxValue;
        } else if (upperValue < lowerValue) {
          event.target.value = lowerValue;
        }
    }
  }
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.metadataLoaded = true;
    this.videoDuration = this.video.duration;
    this.playerService.videoDuration.next(this.videoDuration);
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
  updateTrackerBetween() {
    const trackerBetween = this.trackerBetweenRef.nativeElement;
    const lowerValue = this.clipStartInput;
    const upperValue = this.clipEndInput;
    const width = `${(upperValue - lowerValue) / this.videoDuration * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(trackerBetween, 'width', width);
    this.renderer.setStyle(trackerBetween, 'left', left);
  }
  manageVideoTracker() {
    this.updateSelectors();
    this.updateTrackerBetween();
  }
  updateSelectors () {
    const ct = this.video.currentTime;
    // Just updates the slider when is playing from the start point
    if (Math.floor(ct) <= this.clipStartInput + 0.4 ) {
      this.clipStartInput = ct;
      this.playerService.onChangedLowerRange.next(ct);
    } else {
      this.clipEndInput = ct;
      this.playerService.onChangedUpperRange.next(ct);
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
