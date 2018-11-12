import { Component, OnInit } from '@angular/core';
import { Clip } from './clip.model';

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
  clipSelectedIndex: number;


  constructor() { }

  ngOnInit() {
  }

  handleClipCreated(clip: Clip) {
    this.clips.push(clip);
  }
  handleClipEdited(clip: Clip) {
    const clipToEdit = this.clips[this.clipSelectedIndex];
    clipToEdit.name = clip.name;
    clipToEdit.start = clip.start;
    clipToEdit.end = clip.end;
  }
  deleteClip(index) {
    this.clips.splice( index, 1);
  }
  handleEditClip(event: {modal: boolean, modalType: string}, i) {
    this.modal = event.modal;
    this.modalType = event.modalType;
    this.clipSelected = this.clips[i];
    this.clipSelectedIndex = i;
  }
  handleNewClip(event: {modal: boolean, modalType: string}) {
    this.modal = event.modal;
    this.modalType = event.modalType;
  }
  handleCloseModal(event: boolean) {
    this.modal = event;
  }
}
