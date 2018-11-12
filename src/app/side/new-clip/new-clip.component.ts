import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-clip',
  templateUrl: './new-clip.component.html',
  styleUrls: ['./new-clip.component.css']
})
export class NewClipComponent implements OnInit {

  @Output() newClip = new EventEmitter<{modal: boolean, modalType: string}>();

  constructor() { }

  ngOnInit() {
  }
  onNewCLip(): void {
    this.newClip.emit({
      modal: true,
      modalType: 'create'
    });
  }

}
