import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {

  @Input() clip: {name: string, start: number, end: number};
  @Output() clipDeleted = new EventEmitter();
  @Output() clipEdited = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteCLipEmmiter() {
    this.clipDeleted.emit();
  }
  editCLipEmmiter() {
    this.clipEdited.emit();
  }
}
