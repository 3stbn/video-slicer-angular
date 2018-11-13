import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideComponent } from './side/side.component';
import { PreviewComponent } from './preview/preview.component';
import { ClipsComponent } from './side/clips/clips.component';
import { ClipModalComponent } from './side/clip-modal/clip-modal.component';
import { NewClipComponent } from './side/new-clip/new-clip.component';
import { StaticClipComponent } from './side/static-clip/static-clip.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { ClipService } from './shared/clip.service';
import { PlayerService } from './shared/player.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideComponent,
    PreviewComponent,
    ClipsComponent,
    ClipModalComponent,
    NewClipComponent,
    StaticClipComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ClipService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
