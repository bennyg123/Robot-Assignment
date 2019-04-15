import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameControlsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
