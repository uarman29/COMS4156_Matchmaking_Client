import { Component, OnInit, ViewChild } from '@angular/core';
import { Game_Details, Game_Response_Object, Get_Games_Response, MatchmakingApiService, Post_Games_Request } from 'src/app/services/matchmaking-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.css']
})
export class GamesViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  games: Game_Response_Object[] = []
  displayedColumns:string[] = ["game_name", "category", "players_per_team", "teams_per_match", "view"];
  dataSource!:MatTableDataSource<Game_Response_Object>;

  gameForm = this.fb.group({
    game_name: [""],
    category: [""],
    players_per_team: [1],
    teams_per_match: [1],
    game_parameter1_name: [""],
    game_parameter1_weight: [0],
    game_parameter2_name: [""],
    game_parameter2_weight: [0],
    game_parameter3_name: [""],
    game_parameter3_weight: [0],
    game_parameter4_name: [""],
    game_parameter4_weight: [0],
  });

  get game_name() {
    return this.gameForm.get('game_name') as FormControl;
  }

  get catgeory() {
    return this.gameForm.get('category') as FormControl;
  }

  get players_per_team() {
    return this.gameForm.get('players_per_team') as FormControl;
  }

  get teams_per_match() {
    return this.gameForm.get('teams_per_match') as FormControl;
  }

  get game_parameter1_name() {
    return this.gameForm.get('game_parameter1_name') as FormControl;
  }

  get game_parameter1_weight() {
    return this.gameForm.get('game_parameter1_weight') as FormControl;
  }

  get game_parameter2_name() {
    return this.gameForm.get('game_parameter2_name') as FormControl;
  }

  get game_parameter2_weight() {
    return this.gameForm.get('game_parameter2_weight') as FormControl;
  }

  get game_parameter3_name() {
    return this.gameForm.get('game_parameter3_name') as FormControl;
  }

  get game_parameter3_weight() {
    return this.gameForm.get('game_parameter3_weight') as FormControl;
  }

  get game_parameter4_name() {
    return this.gameForm.get('game_parameter4_name') as FormControl;
  }

  get game_parameter4_weight() {
    return this.gameForm.get('game_parameter4_weight') as FormControl;
  }

  updateData() {
    this.matchmatckingAPI.getGames().subscribe(response =>{
      if(response.status == 200 || response.status == 204) {
        this.games = response.body ? response.body.games : [];
        this.dataSource.data = this.games;
        console.log("NAVIGATION")
        if(response.status == 204) {
          alert("No games found");
        }
      }
    }, err => {
      if (err.status == 401) {
        this.auth.logout();
        window.location.href = "/login";
      }
    });
  }
  
  constructor(
    private matchmatckingAPI: MatchmakingApiService, 
    private fb: FormBuilder, 
    private router: Router, 
    private auth: AuthServiceService
    ) { }

  navigate(game: Game_Response_Object) {
    this.router.navigate(["/games/"+ game.id]);
  }
  
  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#game-add-success-alert").addClass("d-none");
    })

    this.matchmatckingAPI.getGames().subscribe(response =>{
      if(response.status == 200 || response.status == 204) {
        console.log("INITIAL")
        this.games = response.body ? response.body.games : [];
        this.dataSource = new MatTableDataSource<Game_Response_Object>(this.games);
        this.dataSource.paginator = this.paginator;
        if(response.status == 204) {
          alert("No games found");
        }
      }
    }, err => {
      if (err.status == 401) {
        this.auth.logout();
        window.location.href = "/login";
      }
    });

    // this.router.events.subscribe((ev) => {
    //   if(ev instanceof NavigationEnd) {
    //     if(ev.url == "/games")
    //       this.updateData()
    //   }
    // });
  }

  onAddGame() {
    if(!this.gameForm.valid){
      return;
    }

    let parameters: string[] = [
      this.game_parameter1_name.value ? this.game_parameter1_name.value : "", 
      this.game_parameter2_name.value ? this.game_parameter2_name.value : "", 
      this.game_parameter3_name.value ? this.game_parameter3_name.value : "",
      this.game_parameter4_name.value ? this.game_parameter4_name.value : ""
    ]

    let weights: number[] = [
      this.game_parameter1_weight.value ? this.game_parameter1_weight.value: 0, 
      this.game_parameter2_weight.value ? this.game_parameter2_weight.value: 0, 
      this.game_parameter3_weight.value ? this.game_parameter3_weight.value: 0,
      this.game_parameter4_weight.value ? this.game_parameter4_weight.value: 0
    ]
    let gd:Post_Games_Request = {
      name: this.game_name.value, 
      category: this.catgeory.value,
      players_per_team: this.players_per_team.value, 
      teams_per_match: this.teams_per_match.value, 
      parameters: parameters,
      weights: weights
    };
    this.matchmatckingAPI.addGame(gd).subscribe(response => {
      if(response.status == 200) {
        this.updateData();
        this.gameForm.reset();
        $("#game-add-success-alert").removeClass("d-none");
      }
    }, err => {
      if(err.status == 400) {
        alert("Invalid Input");
      } else if(err.status == 401) {
        this.auth.logout();
        window.location.href = "/login";
      }
    });
  }

}
