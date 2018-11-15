import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

@Injectable()
export class ClipService  {
  constructor(private playerService: PlayerService) {
    for (let i = 1; i <= 8; i ++) {
      this.addCLip(new Clip(`Test${i}`, i , i + 4));
    }
  }
  private clips: Clip[] = [];

  clipsChanged = new Subject<Clip[]>();
  clipToEdit = new Subject<Clip>();
  toggleModal = new Subject<boolean>();
  modalType = new Subject<string>();

  public getClips(): Clip[] {
    return this.clips.slice();
  }

  addCLip(clip: Clip) {
    clip.id = Math.floor(Math.random() * 100000000);
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
  checksLastClip(id: number): boolean {
    const lastClip = this.clips.length - 1 ;
    const index = this.clips.findIndex((x) => x.id === id);
    return index === lastClip ? true : false;
  }
  playNextClip(id: number) {
    const index = this.clips.findIndex((x) => x.id === id);
    this.playerService.selectClip.next(this.clips[index + 1]);
    console.log('Index actual' + index);
    this.playerService.playNotifier.next();
  }
}

