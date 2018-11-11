import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  modal = false;
  modalType = 'create';
  clips = [];
  clipName = '';
  clipStart = null;
  clipEnd = null;
  clipIndex = null;

  constructor() { }

  ngOnInit() {
  }
  toogleModal() {
    this.modal = !this.modal;
  }
  addClip() {
    this.toogleModal();
    this.modalType = 'create';
  }
  saveClip() {
    if (this.modalType === 'create') {
      this.clips.push({
        name: this.clipName,
        start: this.clipStart,
        end: this.clipEnd
      });
      this.toogleModal();
      this.resetForm();
    } else {
      const clip = this.clips[this.clipIndex];
      clip.name = this.clipName;
      clip.start = this.clipStart;
      clip.end = this.clipEnd;
      this.toogleModal();
    }
  }
  cancelClip() {
    this.toogleModal();
    this.resetForm();
  }
  resetForm() {
    this.clipName = '';
    this.clipStart = null;
    this.clipEnd = null;
  }
  deleteClip(index) {
    this.clips.splice( index, 1);
  }
  editClip(clipIndex) {
    this.modalType = 'edit';
    this.clipIndex = clipIndex;
    const clip = this.clips[clipIndex];
    this.clipName = clip.name;
    this.clipStart = clip.start;
    this.clipEnd = clip.end;
    this.toogleModal();
  }
}
