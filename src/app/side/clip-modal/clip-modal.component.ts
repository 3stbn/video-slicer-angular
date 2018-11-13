import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

  clipId: number;
  clipNameInput: string;
  clipStartInput: number;
  clipEndInput: number;

  constructor(private clipService: ClipService) { }

  ngOnInit() {
    if (this.modalType === 'edit') {
      const clipToEdit = this.clipToEdit;
      this.clipId = clipToEdit.id;
      this.clipNameInput = clipToEdit.name;
      this.clipStartInput = clipToEdit.start;
      this.clipEndInput = clipToEdit.end;
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
}

