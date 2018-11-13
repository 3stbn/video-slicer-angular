import { Component, OnInit, Input } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {

  @Input() clip: Clip;

  constructor(private clipService: ClipService) { }

  ngOnInit() {
  }

  deleteCLipEmmiter(): void {
    this.clipService.deleteClip(this.clip.id);
  }
  editCLipEmmiter(): void {
    this.clipService.toggleModal.emit(true);
    this.clipService.modalType.emit('edit');
    this.clipService.clipToEdit.emit(this.clip);
  }
}
