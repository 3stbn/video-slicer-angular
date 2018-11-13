import { EventEmitter } from '@angular/core';

export class PlayerService {
  onChangedLowerRange = new EventEmitter<number>();
  onChangedUpperRange = new EventEmitter<number>();
  videoDuration = new EventEmitter<number>();
}
