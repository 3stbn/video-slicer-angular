import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, OnChanges, HostListener } from '@angular/core';
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

  @ViewChild ('trackerBetween') trackerBetweenRef: ElementRef;
  @ViewChild ('trackRangeClip') trackerRangeRef: ElementRef;
  @ViewChild ('clipWidth') clipWidthRef: ElementRef;
  @ViewChild('videoSelector') videoSelectorRef: ElementRef;

  iconPlayPause = 'fa-play';
  videoDuration: number;
  metadataLoaded: boolean;
  preLoader: boolean;
  blockVideoControls: boolean;
  playDelay: any;
  video: HTMLVideoElement;

  constructor(private playerService: PlayerService,
              private renderer: Renderer2,
              private clipService: ClipService,
              private mainVideoService: MainVideoService) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
  }
  ngOnChanges(changes) {
    if (this.metadataLoaded === true) {
      this.video.currentTime = this.clipStart;
      this.updateTrackerBetween(this.video.currentTime);
      this.updateClipWidth();
      this.updateTrackerRangeClip();
      this.blockVideoControls = null;
    }
  }
  defineVideoDuration() {
    // Triggered when the video data is loaded to define max values for the ranges inputs
    this.metadataLoaded = true;
    this.videoDuration = this.video.duration;
    // update video player ui
    this.updateClipWidth();
    this.updateTrackerRangeClip();
    this.updateTrackerBetween(this.video.currentTime);
    // update main video
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
      if (this.blockVideoControls !== false ) {
        this.blockVideoControls = true;
      }
      this.video.pause();
      this.iconPlayPause = 'fa-play';
      if (this.playType === 'clip') {
        this.checkVideoControls('next');
      }
    }
  }
  checkVideoControls(type: string) {
    if (this.blockVideoControls === true ) {
      switch (type) {
        case('next'):
          this.playNextClip();
          break;
        case('previous'):
          this.playPreviousClip();
      }
    }
  }
  playNextClip() {
    if (this.clipService.checksLastClip(this.clipId) === false) {
      this.preLoader = true;
      this.blockVideoControls = false;
      this.playDelay = setTimeout(() => {
        this.clipService.playNextClip(this.clipId);
        this.preLoader = false;
      }, 3000);
    }
  }
  playPreviousClip() {
    if (this.clipService.checkFirstClip(this.clipId) === false) {
      this.preLoader = true;
      this.blockVideoControls = false;
      this.playDelay = setTimeout(() => {
        this.clipService.playPreviousClip(this.clipId);
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
        this.playPromise();
        this.iconPlayPause = 'fa-pause';
      }
    } else {
      video.pause();
      this.iconPlayPause = 'fa-play';
    }
  }
  handlePlaylist() {
   this.playerService.playNotifier.subscribe(() => {
     // Clears the timeout if it is activated
     if (this.blockVideoControls === false) {
      this.preLoader = false;
      clearTimeout(this.playDelay);
      this.playPromise();
      this.iconPlayPause = 'fa-pause';
      // Plays the playlist
     } else {
      this.playPromise();
      this.iconPlayPause = 'fa-pause';
     }
   });
  }
  playPromise() {
    const playPromise = this.video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.preLoader = false;
        this.video.play();
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        this.preLoader = true;
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  }
  // Plays next and previous clip
  @HostListener('window:keydown', ['$event'])
    onkeydown(event) {
      if (event.keyCode === 39) {
        if (this.blockVideoControls !== false ) {
          this.blockVideoControls = true;
        }
        this.video.pause();
        this.iconPlayPause = 'fa-pause';
        this.checkVideoControls('next');
      }
      if (event.keyCode === 37) {
        if (this.blockVideoControls !== false ) {
          this.blockVideoControls = true;
        }
        this.video.pause();
        this.iconPlayPause = 'fa-pause';
        this.checkVideoControls('previous');
      }
    }
}

