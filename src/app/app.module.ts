import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GamesViewComponent } from './components/games-view/games-view.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MatchmakeViewComponent } from './components/matchmake-view/matchmake-view.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GamesViewComponent,
    GameViewComponent,
    LoginViewComponent,
    MatchmakeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
