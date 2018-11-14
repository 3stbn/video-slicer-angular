import { EventEmitter } from '@angular/core';
import { Clip } from './clip.model';

export class PlayerService {
  onChangedLowerRange = new EventEmitter<number>();
  onChangedUpperRange = new EventEmitter<number>();
  videoDuration = new EventEmitter<number>();

  selectClip = new EventEmitter<Clip>();
}
