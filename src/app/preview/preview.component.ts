import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { Clip } from '../shared/clip.model';
import { Subscription } from 'rxjs';
import { MainVideoService } from '../shared/mainVideo.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, OnDestroy {

  videoSource: string;
  clipStart = 0;
  clipEnd: number;
  clipName: string;
  playType = 'default';
  clipId: number;

  // Subscriptions

  videoDurationSubscription: Subscription;
  selectedClipSubscription: Subscription;

  constructor(private playerService: PlayerService, private mainVideoService: MainVideoService) { }

  ngOnInit() {
    // Starts with main video
    this.videoSource = this.mainVideoService.getSource();
    this.clipName = this.mainVideoService.getName();
    // Duration of main video
    this.videoDurationSubscription = this.playerService.videoDuration.subscribe(
      (videoDuration: number) => this.clipEnd = videoDuration
    );
    // Changes when a clip was selected
    this.selectedClipSubscription = this.playerService.selectClip.subscribe(
      (clip: Clip) => {
        this.clipStart = clip.start;
        this.clipEnd = clip.end;
        this.clipName = clip.name;
        this.videoSource = clip.source;
        this.playType = 'clip';
        this.clipId = clip.id;
      }
    );
  }
  ngOnDestroy() {
    this.videoDurationSubscription.unsubscribe();
    this.selectedClipSubscription.unsubscribe();
  }
}
