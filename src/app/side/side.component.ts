import { Component, OnInit, OnDestroy } from '@angular/core';
import { Clip } from '../shared/clip.model';
import { ClipService } from '../shared/clip.service';
import { Subscription } from 'rxjs';
import StorageService from '../shared/storage.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit, OnDestroy {
  modal: boolean;
  modalType: string;
  clips = [];
  clipSelected: Clip;

  constructor(private clipService: ClipService, private storageService: StorageService) { }

  // Services
  clipsChangedSubscription: Subscription;
  toggleModalSubscription: Subscription;
  modalTypeSubscription: Subscription;
  clipToEditSubscription: Subscription;

  ngOnInit() {
    this.storageService.getClips();
    this.clips = this.clipService.getClips();
    this.clipsChangedSubscription = this.clipService.clipsChanged.subscribe(
      (clips: Clip[]) => this.clips = clips
    );
    this.toggleModalSubscription = this.clipService.toggleModal.subscribe(
      (modal: boolean) => this.modal = modal
    );
    this.modalTypeSubscription = this.clipService.modalType.subscribe(
      (type: string) => {
        this.modalType = type;
      }
    );
    this.clipsChangedSubscription = this.clipService.clipToEdit.subscribe(
      (clip: Clip) => this.clipSelected = clip
    );
  }
  ngOnDestroy() {
    this.clipsChangedSubscription.unsubscribe();
    this.toggleModalSubscription.unsubscribe();
    this.modalTypeSubscription.unsubscribe();
    this.clipToEditSubscription.unsubscribe();
  }
}
