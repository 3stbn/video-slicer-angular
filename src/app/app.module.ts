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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideComponent,
    PreviewComponent,
    ClipsComponent,
    ClipModalComponent,
    NewClipComponent,
    StaticClipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
