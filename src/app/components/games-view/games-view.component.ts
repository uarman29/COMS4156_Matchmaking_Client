import { Component, OnInit, ViewChild } from '@angular/core';
import { Game_Details, MatchmakingApiService } from 'src/app/services/matchmaking-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.css']
})
export class GamesViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  games: Game_Details[] = []
  displayedColumns:string[] = ["game_name", "category", "players_per_team", "teams_per_match", "view"];
  dataSource!:MatTableDataSource<Game_Details>;

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
      this.games = response.body ? response.body : [];
      this.dataSource.data = this.games;
    });
  }
  
  constructor(private matchmatckingAPI: MatchmakingApiService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    $(".btn-close").on("click", function(){
      $("#game-add-success-alert").addClass("d-none");
    })

    this.matchmatckingAPI.getGames().subscribe(response =>{
      if(response.status == 200) {
        alert("GOT GAMES");
        this.games = response.body ? response.body : [];
        this.dataSource = new MatTableDataSource<Game_Details>(this.games);
        this.dataSource.paginator = this.paginator;
      }
    });

    this.router.events.subscribe(() => this.updateData());
  }

  onAddGame() {
    if(!this.gameForm.valid){
      return;
    }
    let gd:Game_Details = {
      game_id: 1, 
      developer_email: "",
      game_name: this.game_name.value, 
      category: this.catgeory.value,
      players_per_team: this.players_per_team.value, 
      teams_per_match: this.teams_per_match.value, 
      game_parameter1_name: this.game_parameter1_name.value,
      game_paramtere1_weight: this.game_parameter1_weight.value,
      game_parameter2_name: this.game_parameter2_name.value,
      game_paramtere2_weight: this.game_parameter2_weight.value,
      game_parameter3_name: this.game_parameter3_name.value,
      game_paramtere3_weight: this.game_parameter3_weight.value,
      game_parameter4_name: this.game_parameter4_name.value,
      game_paramtere4_weight: this.game_parameter4_weight.value,
    };
    this.matchmatckingAPI.addGame(gd).subscribe(response => {
      this.updateData();
      this.gameForm.reset();
      $("#game-add-success-alert").removeClass("d-none");
    });
  }

}
