import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input() videoSource: string;
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
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.metadataLoaded = true;
    this.videoDuration = this.video.duration;
    this.playerService.videoDuration.emit(this.video.duration);
  }
  manageVideoTracker() {
    const ct = this.video.currentTime;
    this.updateTrackerBetween(ct);
  }
  updateTrackerBetween(currentTime: number) {
    const trackerBetween = this.trackerBetweenRef.nativeElement;
    const lowerValue = this.clipStart;
    const width = `${(currentTime / this.videoDuration) * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(trackerBetween, 'width', width);
    this.renderer.setStyle(trackerBetween, 'left', left);
  }
  updateTrackerRangeClip() {
    const trackerRangeClip = this.trackerRangeRef.nativeElement;
    const lowerValue = this.clipStart;
    const upperValue = this.clipEnd;
    const width = `${(upperValue - lowerValue) / this.videoDuration * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(trackerRangeClip, 'width', width);
    this.renderer.setStyle(trackerRangeClip, 'left', left);
  }
  updateClipWidth() {
    const clipWidth = this.clipWidthRef.nativeElement;
    const lowerValue = this.clipStart;
    const upperValue = this.clipEnd;
    const width = `${(upperValue - lowerValue) / this.videoDuration * 100}%`;
    const left = `${lowerValue / this.videoDuration * 100}%`;
    this.renderer.setStyle(clipWidth, 'width', width);
    this.renderer.setStyle(clipWidth, 'left', left);
  }
  changeCurrentTime(event) {
    const hoverOnPercent = event.offsetX / event.target.clientWidth;
    console.log(hoverOnPercent);
    const newTime = hoverOnPercent * this.videoDuration;
    this.video.currentTime = newTime;
  }
  setRangeUI() {
    this.updateTrackerRangeClip();
    this. updateClipWidth();
  }
  togglePlay() {
    const video = this.video;
    if (video.paused) {
      this.video.play();
      this.iconPlayPause = 'fa-pause';
    } else {
      video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }

}
