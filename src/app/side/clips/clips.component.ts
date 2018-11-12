import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Clip} from '../clip.model';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {

  @Input() clip: Clip;
  @Output() clipDeleted = new EventEmitter();
  @Output() editClip = new EventEmitter<{modal: boolean, modalType: string}>();

  constructor() { }

  ngOnInit() {
  }

  deleteCLipEmmiter(): void {
    this.clipDeleted.emit();
  }
  editCLipEmmiter(): void {
    this.editClip.emit({
      modal: true,
      modalType: 'edit',
    });
  }
}
