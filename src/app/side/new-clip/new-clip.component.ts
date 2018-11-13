import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClipService } from 'src/app/shared/clip.service';

@Component({
  selector: 'app-new-clip',
  templateUrl: './new-clip.component.html',
  styleUrls: ['./new-clip.component.css']
})
export class NewClipComponent implements OnInit {

  constructor(private clipService: ClipService) { }

  ngOnInit() {
  }
  onNewCLip(): void {
    this.clipService.toggleModal.emit(true);
    this.clipService.modalType.emit('create');
  }

}
