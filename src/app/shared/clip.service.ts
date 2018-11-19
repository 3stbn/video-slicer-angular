import { Clip } from './clip.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { MainVideoService } from './mainVideo.service';

@Injectable()
export class ClipService  {
  constructor(private playerService: PlayerService, private mainVideoService: MainVideoService) {
/*     for (let i = 1; i <= 4; i ++) {
      this.addCLip(new Clip(`Test${i}`, i , i + 4, [`Tag ${i}`, `Tag ${i + 1}` ],
      `${this.mainVideoService.getSource()}#t=${i},${i + 4}`
      ));
    } */
  }
  private clips: Clip[] = [];

  clipsChanged = new Subject<Clip[]>();
  clipToEdit = new Subject<Clip>();
  toggleModal = new Subject<boolean>();
  modalType = new Subject<string>();

  public getClips(): Clip[] {
    return this.clips.slice();
  }
  public setClips(clips: Clip[]) {
    this.clips = clips;
    this.clipsChanged.next(this.clips.slice());
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
  checkFirstClip(id: number): boolean {
    if (!id) {
      return true;
    }
    const index = this.clips.findIndex((x) => x.id === id);
    return index === 0 ? true : false;
  }
  playPreviousClip(id: number) {
    const index = this.clips.findIndex((x) => x.id === id);
    this.playerService.selectClip.next(this.clips[index - 1]);
    console.log('Index actual' + index);
    this.playerService.playNotifier.next();
  }
  filterClipsByTag(input: string) {
    const term = input.toLowerCase();
    const arrayIndexResult = [];
    this.clips.forEach((clip) => {
      clip.tags.forEach((tag) => {
        if (tag.toLowerCase().indexOf(term) !== -1 ) {
          const indexResult = this.clips.indexOf(clip);
          if (!arrayIndexResult.includes(indexResult)) {
            arrayIndexResult.push(indexResult);
          }
        }
      });
    });
    const filterResult = arrayIndexResult.map((item) => this.clips[item]);
    this.clipsChanged.next(filterResult);
  }
}

