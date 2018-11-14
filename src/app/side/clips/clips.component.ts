import { Component, OnInit, Input } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {

  @Input() clip: Clip;

  constructor(private clipService: ClipService, private playerService: PlayerService) { }

  ngOnInit() {
  }

  deleteCLipEmmiter() {
    this.clipService.deleteClip(this.clip.id);
    this.playerService.selectClip.next(new Clip('Main Video', 0, 52 ));
  }
  editCLipEmmiter() {
    this.clipService.toggleModal.next(true);
    this.clipService.modalType.next('edit');
    this.clipService.clipToEdit.next(this.clip);
  }
  selectClip() {
    this.playerService.selectClip.next(this.clip);
  }
}
