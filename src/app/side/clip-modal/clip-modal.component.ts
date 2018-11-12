import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import {Clip} from '../clip.model';

@Component({
  selector: 'app-clip-modal',
  templateUrl: './clip-modal.component.html',
  styleUrls: ['./clip-modal.component.css']
})
export class ClipModalComponent implements OnInit {

  @Input() modalType: string;
  @Input() clipToEdit: Clip;
  @Output() showModal = new EventEmitter<boolean>();
  @Output() clipCreated = new EventEmitter<Clip>();
  @Output() clipEdited = new EventEmitter<Clip>();

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  clipNameInput: string;
  clipStartInput: number;
  clipEndInput: number;
  videoDuration: number;

  iconPlayPause = 'fa-play';

  constructor() { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
    if (this.modalType === 'edit') {
      this.clipNameInput  = this.clipToEdit.name;
      this.clipStartInput  = this.clipToEdit.start;
      this.clipEndInput  = this.clipToEdit.end;
      this.video.currentTime = this.clipToEdit.start;
    }
  }
  cancelClip(): void {
    this.showModal.emit(false);
  }
  onSaveClip() {
    switch (this.modalType) {
      case('create'):
        const clip = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput);
        this.clipCreated.emit(clip);
        this.showModal.emit(false);
        break;
      case('edit'):
        const clipEdited = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput);
        this.clipEdited.emit(clipEdited);
        this.showModal.emit(false);
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
    if (this.modalType === 'create') {
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
}

