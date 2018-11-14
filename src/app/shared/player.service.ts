import { Clip } from './clip.model';
import { Subject } from 'rxjs';

export class PlayerService {
  onChangedLowerRange = new Subject<number>();
  onChangedUpperRange = new Subject<number>();
  videoDuration = new Subject<number>();

  selectClip = new Subject<Clip>();

  playNotifier = new Subject();
}
