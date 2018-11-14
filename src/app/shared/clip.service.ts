import { Clip } from './clip.model';
import { Subject } from 'rxjs';

export class ClipService {
  private clips: Clip[] = [];
  private mainVideo = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

  clipsChanged = new Subject<Clip[]>();
  clipToEdit = new Subject<Clip>();
  toggleModal = new Subject<boolean>();
  modalType = new Subject<string>();

  public getClips() {
    return this.clips.slice();
  }
  public getMainVideo() {
    return this.mainVideo;
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
}

