import { EventEmitter} from '@angular/core';
import { Clip } from './clip.model';

export class ClipService {
  private clips: Clip[] = [];

  clipsChanged = new EventEmitter<Clip[]>();
  clipToEdit = new EventEmitter<Clip>();
  toggleModal = new EventEmitter<boolean>();
  modalType = new EventEmitter<string>();

  public getClips() {
    return this.clips.slice();
  }
  addCLip(clip: Clip) {
    clip.id = this.clips.length + 1;
    this.clips.push(clip);
    this.clipsChanged.emit(this.clips.slice());
  }
  editClip(modifiedClip: Clip, clipId: number) {
    const index = this.clips.findIndex((x) => x.id === clipId);
    this.clips[index] = modifiedClip;
    this.clipsChanged.emit(this.clips.slice());
  }
  deleteClip (id: number) {
    const index = this.clips.findIndex((x) => x.id === id);
    this.clips.splice( index, 1);
    this.clipsChanged.emit(this.clips.slice());
  }
}

