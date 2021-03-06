import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: StorageService) { }
  saveSuccess = false;
  ngOnInit() {
  }
  storeData() {
    this.storageService.storeClips().subscribe(() => this.saveSuccess = true );
  }
}
