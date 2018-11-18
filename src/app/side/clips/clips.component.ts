import { Component, OnInit, Input } from '@angular/core';
import {Clip} from '../../shared/clip.model';
import { ClipService } from 'src/app/shared/clip.service';
import { PlayerService } from 'src/app/shared/player.service';
import { MainVideoService } from 'src/app/shared/mainVideo.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {

  @Input() clip: Clip;

  constructor(private clipService: ClipService,
              private playerService: PlayerService,
              private mainVideoService: MainVideoService) { }

  ngOnInit() {
  }

  deleteCLipEmmiter() {
    this.clipService.deleteClip(this.clip.id);
    // Returns Player to the start
    this.playerService.selectClip.next(new Clip(
      this.mainVideoService.getName(), 0 , this.mainVideoService.getVideoDuration(),
      [], this.mainVideoService.getSource()
    ));
  }
  editCLipEmmiter() {
    this.clipService.toggleModal.next(true);
    this.clipService.modalType.next('edit');
    this.clipService.clipToEdit.next(this.clip);
  }
  selectClip() {
    this.playerService.selectClip.next(this.clip);
    this.playerService.playNotifier.next();
  }
}
