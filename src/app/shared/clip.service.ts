import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

@Injectable()
export class ClipService {
  constructor(private playerService: PlayerService) { }
  private clips: Clip[] = [];

  clipsChanged = new Subject<Clip[]>();
  clipToEdit = new Subject<Clip>();
  toggleModal = new Subject<boolean>();
  modalType = new Subject<string>();

  public getClips() {
    return this.clips.slice();
  }

  addCLip(clip: Clip) {
    clip.id = this.clips.length + 1;
    this.clips.push(clip);
    this.clipsChanged.next(this.clips.slice());
  }
  editClip(modifiedClip: Clip, clipId: number) {
    const index = this.clips.findIndex((x) => x.id === clipId);
    this.clips[index] = modifiedClip;
    this.clipsChanged.next(this.clips.slice());
  }
  deleteClip (id: number) {
    const index = this.clips.findIndex((x) => x.id === id);
    this.clips.splice( index, 1);
    this.clipsChanged.next(this.clips.slice());
  }
  playNextClip(id: number) {
    const lastClip = this.clips.length - 1 ;
    const index = this.clips.findIndex((x) => x.id === id);
    if (index !== lastClip ) {
      this.playerService.selectClip.next(this.clips[index + 1]);
      this.playerService.playNotifier.next();
    }
  }
}

