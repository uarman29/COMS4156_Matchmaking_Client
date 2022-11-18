import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamesViewComponent } from './components/games-view/games-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MatchmakeViewComponent } from './components/matchmake-view/matchmake-view.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  { path: 'games/:id', component: GameViewComponent, canActivate: [AuthGuardGuard] },
  { path: 'games', component: GamesViewComponent, canActivate: [AuthGuardGuard] },
  { path: 'matchmake', component: MatchmakeViewComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
