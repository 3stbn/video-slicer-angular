import { Component, OnInit } from '@angular/core';
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
    this.clipService.toggleModal.next(true);
    this.clipService.modalType.next('create');
  }

}
