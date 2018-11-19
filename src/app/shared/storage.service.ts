import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClipService } from './clip.service';
import { Clip } from './clip.model';
import { map } from 'rxjs/operators';

@Injectable()
export class StorageService {
  constructor(private httpClient: HttpClient,
              private clipService: ClipService) {}
  backendUrl = 'https://ng-video-slicer.firebaseio.com/';
  storeClips() {
    return this.httpClient.put(this.backendUrl + 'clips.json', this.clipService.getClips());
  }
  getClips() {
    this.httpClient.get<Clip[]>(this.backendUrl + 'clips.json')
      .pipe( map (
        clips => {
          console.log(clips);
          for (const clip of clips) {
            if (!clip['tags']) {
              clip['tags'] = [];
            }
          }
          return clips;
        }
      ))
      .subscribe(
        (clips: Clip[]) => {
          this.clipService.setClips(clips);
        }
      );
  }
}
