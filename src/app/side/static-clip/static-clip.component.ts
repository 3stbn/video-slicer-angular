import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { Clip } from 'src/app/shared/clip.model';
import { MainVideoService } from 'src/app/shared/mainVideo.service';

@Component({
  selector: 'app-static-clip',
  templateUrl: './static-clip.component.html',
  styleUrls: ['./static-clip.component.css']
})
export class StaticClipComponent implements OnInit {

  constructor(private playerService: PlayerService, private mainVideoService: MainVideoService) { }

  mainVideoDuration: number;
  mainVideoName: string;
  urlInput: string;
  changeUrl: boolean;

  ngOnInit() {
    this.mainVideoName = this.mainVideoService.getName();
    this.playerService.videoDuration.subscribe(
      (videoDuration: number) => this.mainVideoDuration = videoDuration
    );
  }
  selectClip() {
    this.playerService.selectClip.next(new Clip(this.mainVideoName, 0, this.mainVideoDuration,
      [], this.mainVideoService.getSource()));
    this.playerService.playType.next('default');
    this.playerService.playNotifier.next();
  }
  onChangeClip() {
    this.mainVideoService.changeUrl(this.urlInput);
    this.changeUrl = false ;
  }
}
