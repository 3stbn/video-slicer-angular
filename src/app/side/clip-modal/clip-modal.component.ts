import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';

@Component({
  selector: 'app-clip-modal',
  templateUrl: './clip-modal.component.html',
  styleUrls: ['./clip-modal.component.css']
})
export class ClipModalComponent implements OnInit {

  @Input() modalType: string;
  @Input() clipToEdit: Clip;

  @Output() showModal = new EventEmitter<boolean>();
  @Output() clipEdited = new EventEmitter<Clip>();

  @ViewChild('videoSelector') videoSelectorRef: ElementRef;
  video: HTMLVideoElement;

  upperStart: boolean;
  upperEnd: boolean;

  clipId: number;
  clipNameInput: string;
  clipStartInput: number;
  clipEndInput: number;
  videoDuration: number;

  iconPlayPause = 'fa-play';

  constructor(private clipService: ClipService) { }

  ngOnInit() {
    this.video = this.videoSelectorRef.nativeElement;
    if (this.modalType === 'edit') {
      const clipToEdit = this.clipToEdit;
      this.clipId = clipToEdit.id;
      this.clipNameInput = clipToEdit.name;
      this.clipStartInput = clipToEdit.start;
      this.clipEndInput = clipToEdit.end;
      this.video.currentTime = clipToEdit.start;
    }
  }
  closeModal(): void {
    this.clipService.toggleModal.emit(false);
  }
  onSaveClip() {
    switch (this.modalType) {
      case('create'):
        const clip = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput);
        this.clipService.addCLip(clip);
        this.closeModal();
        break;
      case('edit'):
        const clipEdited = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput);
        this.clipService.editClip(clipEdited, this.clipId);
        this.closeModal();
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

