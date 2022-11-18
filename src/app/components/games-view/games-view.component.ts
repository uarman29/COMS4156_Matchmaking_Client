import { Component, OnInit } from '@angular/core';
import { Game_Details, MatchmakingApiService } from 'src/app/services/matchmaking-api.service';

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.css']
})
export class GamesViewComponent implements OnInit {

  games: Game_Details[] = []
  constructor(private matchmatckingAPI: MatchmakingApiService) { }

  ngOnInit(): void {
    this.matchmatckingAPI.getGames().subscribe(response =>{
      if(response.status == 200) {
        alert("GOT GAMES");
        this.games = response.body ? response.body : [];
      }
    });
  }

}
