import { Component, OnInit } from '@angular/core';
import { Clip } from '../shared/clip.model';
import { ClipService } from '../shared/clip.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  modal: boolean;
  modalType: string;
  clips = [];
  clipSelected: Clip;

  constructor(private clipService: ClipService) { }

  ngOnInit() {
    this.clips = this.clipService.getClips();
    this.clipService.clipsChanged.subscribe(
      (clips: Clip[]) => this.clips = clips
    );
    this.clipService.toggleModal.subscribe(
      (modal: boolean) => this.modal = modal
    );
    this.clipService.modalType.subscribe(
      (type: string) => {
        this.modalType = type;
      }
    );
    this.clipService.clipToEdit.subscribe(
      (clip: Clip) => this.clipSelected = clip
    );
  }
}
