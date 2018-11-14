import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-clip-modal',
  templateUrl: './clip-modal.component.html',
  styleUrls: ['./clip-modal.component.css']
})
export class ClipModalComponent implements OnInit {

  @Input() modalType: string;
  @Input() clipToEdit: Clip;

  clipId: number;
  clipNameInput: string;
  clipStartInput: number;
  clipEndInput: number;

  videoDuration: number;

  constructor(private clipService: ClipService, private playerService: PlayerService) { }

  ngOnInit() {
    if (this.modalType === 'edit') {
      const clipToEdit = this.clipToEdit;
      this.clipId = clipToEdit.id;
      this.clipNameInput = clipToEdit.name;
      this.clipStartInput = clipToEdit.start;
      this.clipEndInput = clipToEdit.end;
    } else {
      this.clipStartInput = 0;
    }
    this.playerService.onChangedLowerRange.subscribe(
      (lowerRange: number) => this.clipStartInput = lowerRange
    );
    this.playerService.onChangedUpperRange.subscribe(
      (upperRange: number) => this.clipEndInput = upperRange
    );
    this.playerService.videoDuration.subscribe(
      (videoDuration: number) => {
        this.videoDuration = videoDuration;
        if (this.modalType === 'create') {
          this.clipEndInput = videoDuration;
        }
      }
    );
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
        this.playerService.selectClip.emit(clip);
        break;
      case('edit'):
        const clipEdited = new Clip(this.clipNameInput, this.clipStartInput, this.clipEndInput);
        this.clipService.editClip(clipEdited, this.clipId);
        this.closeModal();
        this.playerService.selectClip.emit(clipEdited);
    }
  }
}

