import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit, OnChanges {

  @Input() videoSource: string;
  @Input() playType: string;
  @Input() clipStart: number;
  @Input() clipEnd: number;

  iconPlayPause = 'fa-play';
  videoDuration: number;
  metadataLoaded: boolean;

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  @ViewChild ('trackerBetween') trackerBetweenRef: ElementRef;
  @ViewChild ('trackRangeClip') trackerRangeRef: ElementRef;
  @ViewChild ('clipWidth') clipWidthRef: ElementRef;

  constructor(private playerService: PlayerService, private renderer: Renderer2) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
  }
  ngOnChanges(changes) {
    if (this.metadataLoaded === true) {
      this.video.currentTime = this.clipStart;
      this.updateTrackerBetween(this.video.currentTime);
      this.updateClipWidth();
      this.updateTrackerRangeClip();
      if (changes.playNotifier) {
        console.log(changes.playNotifier);
        this.togglePlay();
      }
    }
  }
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.metadataLoaded = true;
    this.videoDuration = this.video.duration;
    this.playerService.videoDuration.emit(this.video.duration);
  }
  manageVideoTracker() {
    const ct = this.video.currentTime;
    this.checkClipEnd(ct);
    this.updateTrackerBetween(ct);
  }
  checkClipEnd(currentTime: number) {
    if (Math.floor(currentTime) === Math.floor(this.clipEnd)) {
      this.video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }
  updateTrackerBetween(currentTime: number) {
    const trackerBetween = this.trackerBetweenRef.nativeElement;
    const lowerValue = this.clipStart;
    const width = `${((currentTime / this.videoDuration) - (lowerValue / this.videoDuration)) * 100 }%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(trackerBetween, 'width', width);
    this.renderer.setStyle(trackerBetween, 'left', left);
  }
  canPlay() {
    this.playerService.playNotifier.subscribe((play: boolean) => this.togglePlay());
  }
  // Gray bar for the Range of the Clip
  updateTrackerRangeClip() {
    const trackerRangeClip = this.trackerRangeRef.nativeElement;
    const lowerValue = this.clipStart;
    const upperValue = this.clipEnd;
    const width = `${(upperValue - lowerValue) / this.videoDuration * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(trackerRangeClip, 'width', width);
    this.renderer.setStyle(trackerRangeClip, 'left', left);
  }
  // Transparent bar to change the clip Time on click
  updateClipWidth() {
    const clipWidth = this.clipWidthRef.nativeElement;
    const lowerValue = this.clipStart;
    const upperValue = this.clipEnd;
    const width = `${(upperValue - lowerValue) / this.videoDuration * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(clipWidth, 'width', width);
    this.renderer.setStyle(clipWidth, 'left', left);
  }
  // Change Current Time on click
  changeCurrentTime(event) {
    const hoverOnPercent = event.offsetX / event.target.clientWidth;
    const clipDuration = this.clipEnd - this.clipStart;
    const timeInClip = hoverOnPercent * clipDuration;
    this.video.currentTime = timeInClip + this.clipStart;
  }
  setRangeUI() {
    this.updateTrackerRangeClip();
    this. updateClipWidth();
  }
  togglePlay() {
    const video = this.video;
    if (video.paused) {
      if (Math.floor(this.clipEnd) > Math.floor(this.video.currentTime)) {
        this.video.play();
        this.iconPlayPause = 'fa-pause';
      }
    } else {
      video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }

}
