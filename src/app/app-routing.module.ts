import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamesViewComponent } from './components/games-view/games-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { LoggedInGuard } from './services/logged-in.guard';

const routes: Routes = [
  { path: 'games/:id', component: GameViewComponent, canActivate: [AuthGuardGuard] },
  { path: 'games', component: GamesViewComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginViewComponent, canActivate: [LoggedInGuard] },
  { path: '', component: HomeViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
