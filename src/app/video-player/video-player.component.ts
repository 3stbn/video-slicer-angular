import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, OnChanges } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { MainVideoService } from '../shared/mainVideo.service';
import { ClipService } from '../shared/clip.service';

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

  @Input() clipId: number;

  iconPlayPause = 'fa-play';
  videoDuration: number;
  metadataLoaded: boolean;
  preLoader = false;

  endVideoFlag: boolean;

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  @ViewChild ('trackerBetween') trackerBetweenRef: ElementRef;
  @ViewChild ('trackRangeClip') trackerRangeRef: ElementRef;
  @ViewChild ('clipWidth') clipWidthRef: ElementRef;

  constructor(private playerService: PlayerService,
              private renderer: Renderer2,
              private clipService: ClipService,
              private mainVideoService: MainVideoService) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
  }
  ngOnChanges() {
    if (this.metadataLoaded === true) {
      this.video.currentTime = this.clipStart;
      this.updateTrackerBetween(this.video.currentTime);
      this.updateClipWidth();
      this.updateTrackerRangeClip();
      this.endVideoFlag = null;
    }
  }
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.metadataLoaded = true;
    this.videoDuration = this.video.duration;
    this.playerService.videoDuration.next(this.video.duration);
    this.mainVideoService.updateVideoDuration(this.videoDuration);
  }
  manageVideoTracker() {
    const ct = this.video.currentTime;
    this.checkClipEnd(ct);
    this.updateTrackerBetween(ct);
  }

  checkClipEnd(currentTime: number) {
    if (Math.floor(currentTime) === Math.floor(this.clipEnd)) {
      if (this.endVideoFlag !== false ) {
        this.endVideoFlag = true;
      }
      this.video.pause();
      this.iconPlayPause = 'fa-play';
      if (this.playType === 'clip') {
        this.playNextClip();
      }
    }
  }
  playNextClip() {
    if (this.clipService.checksLastClip(this.clipId) === false && this.endVideoFlag === true) {
      this.preLoader = true;
      this.endVideoFlag = false;
      setTimeout(() => {
        this.clipService.playNextClip(this.clipId);
        this.preLoader = false;
      }, 3000);
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
  handleAutoPlay() {
   this.playerService.playNotifier.subscribe(() => {
    this.video.play();
    this.iconPlayPause = 'fa-pause';
   });
  }
}
