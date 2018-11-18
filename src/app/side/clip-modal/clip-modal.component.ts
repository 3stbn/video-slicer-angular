import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Subscription } from 'rxjs';
import { MainVideoService } from 'src/app/shared/mainVideo.service';

@Component({
  selector: 'app-clip-modal',
  templateUrl: './clip-modal.component.html',
  styleUrls: ['./clip-modal.component.css']
})
export class ClipModalComponent implements OnInit, OnDestroy {

  @Input() modalType: string;
  @Input() clipToEdit: Clip;

  clipId: number;
  clipNameInput: string;
  clipStartInput: number;
  clipEndInput: number;

  tagInput: string;
  clipTags: string[] = [];

  videoDuration: number;
  videoSource: string;

  // Subscriptions
  lowerChangeSubscription: Subscription;
  upperChangeSubscription: Subscription;
  videoDurationSubscription: Subscription;

  constructor(private clipService: ClipService,
              private playerService: PlayerService,
              private mainVideoService: MainVideoService) { }

  ngOnInit() {
    this.videoSource = this.mainVideoService.getSource();
    if (this.modalType === 'edit') {
      const clipToEdit = this.clipToEdit;
      this.clipId = clipToEdit.id;
      this.clipNameInput = clipToEdit.name;
      this.clipStartInput = clipToEdit.start;
      this.clipEndInput = clipToEdit.end;
      this.videoSource = `${this.videoSource}#t=${clipToEdit.start},${clipToEdit.end}`;
      this.clipTags = clipToEdit.tags;
    } else {
      this.clipStartInput = 0;
    }
    this.lowerChangeSubscription =  this.playerService.onChangedLowerRange.subscribe(
      (lowerRange: number) => this.clipStartInput = lowerRange
    );
    this.upperChangeSubscription = this.playerService.onChangedUpperRange.subscribe(
      (upperRange: number) => this.clipEndInput = upperRange
    );
    this.videoDurationSubscription = this.playerService.videoDuration.subscribe(
      (videoDuration: number) => {
        this.videoDuration = videoDuration;
        if (this.modalType === 'create') {
          this.clipEndInput = videoDuration;
        }
      }
    );
  }
  ngOnDestroy() {
    this.lowerChangeSubscription.unsubscribe();
    this.upperChangeSubscription.unsubscribe();
    this.videoDurationSubscription.unsubscribe();
  }
  closeModal(): void {
    this.clipService.toggleModal.next(false);
  }
  onSaveClip() {
    switch (this.modalType) {
      case('create'):
        const clip = new Clip(
          this.clipNameInput, this.clipStartInput, this.clipEndInput, this.clipTags,
          `${this.videoSource}#t=${this.clipStartInput},${this.clipEndInput}`);
        this.clipService.addCLip(clip);
        this.closeModal();
        this.playerService.selectClip.next(clip);
        break;
      case('edit'):
        const clipEdited = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput,
           this.clipTags, `${this.videoSource}#t=${this.clipStartInput},${this.clipEndInput}` );
        this.clipService.editClip(clipEdited, this.clipId);
        this.closeModal();
        this.playerService.selectClip.next(clipEdited);
    }
  }
  onAddTag() {
    this.clipTags.push(this.tagInput);
    this.tagInput = '';
  }
  removeTag(index) {
    this.clipTags.splice( index, 1);
  }
}

