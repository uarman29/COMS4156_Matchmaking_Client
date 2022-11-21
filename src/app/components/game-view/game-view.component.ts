import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game_Details, Get_Players_Response, MatchmakingApiService, Player_Game_Ratings, Post_Player_Request } from 'src/app/services/matchmaking-api.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {

  game!:Game_Details;
  ratings:Player_Game_Ratings[] = [];
  id!:number;

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

  ratingsForm = this.fb.group({
    player_email: [""],
    game_parameter1_value: [0],
    game_parameter2_value: [0],
    game_parameter3_value: [0],
    game_parameter4_value: [0],
    current_ratings: this.fb.array([])
  });

  matchmakingForm = this.fb.group({
    player_emails: [""]
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

  get current_ratings() {
    return this.ratingsForm.get('current_ratings') as FormArray;
  }

  get player_email() {
    return this.ratingsForm.get('player_email') as FormControl;
  }

  get game_parameter1_value() {
    return this.ratingsForm.get('game_parameter1_value') as FormControl;
  }

  get game_parameter2_value() {
    return this.ratingsForm.get('game_parameter2_value') as FormControl;
  }

  get game_parameter3_value() {
    return this.ratingsForm.get('game_parameter3_value') as FormControl;
  }

  get game_parameter4_value() {
    return this.ratingsForm.get('game_parameter4_value') as FormControl;
  }

  get player_emails() {
    return this.matchmakingForm.get('player_emails') as FormControl;
  }

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private matchmakingAPI: MatchmakingApiService
  ) { }
  
  loadRatings() {
    if (this.game) {
      this.matchmakingAPI.getRatings(this.game.game_id).subscribe(response =>{
        if(response.status == 200) {
          this.current_ratings.clear();
          let raw_ratings: Get_Players_Response = {}
          raw_ratings = response.body ? response.body : {};
          this.ratings = [];
          Object.keys(raw_ratings).forEach(key =>{
            let rating: Player_Game_Ratings = {
              game_id: raw_ratings[key]["game_id"],
              player_email: key,
            }
            
            rating.game_parameter1_value = 0;
            rating.game_parameter2_value = 0;
            rating.game_parameter3_value = 0;
            rating.game_parameter4_value = 0;

            if (this.game.game_parameter1_name)
              rating.game_parameter1_value = raw_ratings[key][this.game.game_parameter1_name]
            
            if (this.game.game_parameter2_name)
              rating.game_parameter2_value = raw_ratings[key][this.game.game_parameter2_name]
            
            if (this.game.game_parameter3_name)
              rating.game_parameter3_value = raw_ratings[key][this.game.game_parameter3_name]
            
            if (this.game.game_parameter4_name)
              rating.game_parameter4_value = raw_ratings[key][this.game.game_parameter4_name]

            this.ratings.push(rating)
          })
          for(let rating of this.ratings) {
            let ratingForm = this.fb.group({
              player_email: [rating.player_email],
              game_parameter1_value: [rating.game_parameter1_value],
              game_parameter2_value: [rating.game_parameter2_value],
              game_parameter3_value: [rating.game_parameter3_value],
              game_parameter4_value: [rating.game_parameter4_value],
            });
            this.current_ratings.push(ratingForm);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.matchmakingAPI.getGame(this.id).subscribe(response =>{
      if(response.status == 200)
      {
        if(response.body)
        {
          this.game = response.body;
          this.game_name.setValue(this.game.game_name);
          this.catgeory.setValue(this.game.category);
          this.players_per_team.setValue(this.game.players_per_team);
          this.teams_per_match.setValue(this.game.teams_per_match);
          this.game_parameter1_name.setValue(this.game.game_parameter1_name);
          this.game_parameter1_weight.setValue(this.game.game_parameter1_weight);
          this.game_parameter2_name.setValue(this.game.game_parameter2_name);
          this.game_parameter2_weight.setValue(this.game.game_parameter2_weight);
          this.game_parameter3_name.setValue(this.game.game_parameter3_name);
          this.game_parameter3_weight.setValue(this.game.game_parameter3_weight);
          this.game_parameter4_name.setValue(this.game.game_parameter4_name);
          this.game_parameter4_weight.setValue(this.game.game_parameter4_weight);
          this.loadRatings();
        }
      } else if (response.status == 401) {
        this.router.navigate(["/games"]);
      }
    });
  }

  onUpdate() {
    if(!this.gameForm.valid){
      return;
    }
    let gd:Game_Details = {
      game_id: this.game.game_id, 
      developer_email: this.game.developer_email,
      game_name: this.game_name.value, 
      category: this.catgeory.value,
      players_per_team: this.players_per_team.value, 
      teams_per_match: this.teams_per_match.value, 
      game_parameter1_name: this.game_parameter1_name.value,
      game_parameter1_weight: this.game_parameter1_weight.value,
      game_parameter2_name: this.game_parameter2_name.value,
      game_parameter2_weight: this.game_parameter2_weight.value,
      game_parameter3_name: this.game_parameter3_name.value,
      game_parameter3_weight: this.game_parameter3_weight.value,
      game_parameter4_name: this.game_parameter4_name.value,
      game_parameter4_weight: this.game_parameter4_weight.value,
    };
    this.matchmakingAPI.updateGame(this.game.game_id,gd).subscribe();
    this.router.navigate(['/games']);
  }

  onDelete() {
    this.matchmakingAPI.deleteGame(this.game.game_id).subscribe();
    this.router.navigate(['/games']);
  }

  addRating() {
    let rating:Post_Player_Request = {};
    rating[this.player_email.value]= {
      game_parameter1_value: this.game_parameter1_value.value,
      game_parameter2_value: this.game_parameter2_value.value,
      game_parameter3_value: this.game_parameter3_value.value,
      game_parameter4_value: this.game_parameter4_value.value,
    };
    this.matchmakingAPI.addRating(this.game.game_id, rating).subscribe(() => {
      this.ratingsForm.reset();
      this.loadRatings();
    });
  }

  updateRating(i: number) {
    let rating:Player_Game_Ratings = {
      game_id: this.game.game_id,
      player_email: this.current_ratings.at(i).get('player_email')!.value, 
      game_parameter1_value: this.current_ratings.at(i).get('game_parameter1_value')!.value,
      game_parameter2_value: this.current_ratings.at(i).get('game_parameter2_value')!.value,
      game_parameter3_value: this.current_ratings.at(i).get('game_parameter3_value')!.value,
      game_parameter4_value: this.current_ratings.at(i).get('game_parameter4_value')!.value,
    };
    this.matchmakingAPI.updateRating(this.game.game_id, rating).subscribe(() => this.loadRatings());
  }

  deleteRating(i: number) {
    this.matchmakingAPI.deleteRating(this.game.game_id, this.current_ratings.at(i).get('player_email')!.value).subscribe(() => this.loadRatings());
  }

  matchmake() {
    let players: string[] = this.player_emails.value.split(",").map((player: string) => player.trim());
    this.matchmakingAPI.matchmake(this.game.game_id, players).subscribe(response =>{
      if (response.status == 200) {
        console.log(response.body);
      }
    })
  }

}
