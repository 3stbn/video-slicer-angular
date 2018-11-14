import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { Clip } from 'src/app/shared/clip.model';

@Component({
  selector: 'app-static-clip',
  templateUrl: './static-clip.component.html',
  styleUrls: ['./static-clip.component.css']
})
export class StaticClipComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  clip: Clip;

  ngOnInit() {
    this.clip = new Clip('Main Video', 0, 52 );
  }
  selectClip() {
    this.playerService.selectClip.emit(this.clip);
  }

}
