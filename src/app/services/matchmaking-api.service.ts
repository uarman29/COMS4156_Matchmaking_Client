import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

export interface map {
	[key: string]: string;
}

export interface Link {
	rel: string,
	href: string
}

export interface Developer {
	developer_email: string,
	developer_password: string,
	is_valid?: boolean
}

export interface Player {
	player_email: string,
	is_valid?: boolean
}

export interface Game_Details {
	game_id: number,
  developer_email: string,
	game_name: string,
	game_parameter1_name?: string,
	game_paramtere1_weight?: number,
  game_parameter2_name?: string,
	game_paramtere2_weight?: number,
  game_parameter3_name?: string,
	game_paramtere3_weight?: number,
  game_parameter4_name?: string,
	game_paramtere4_weight?: number,
  category: string,
  players_per_team: number,
  teams_per_match: number,
	is_valid?: boolean
}

export interface Player_Game_Ratings {
	player_email: string,
	game_id: number,
	game_paramter1_value?: number,
  game_paramter2_value?: number,
  game_paramter3_value?: number,
  game_paramter4_value?: number,
  is_valid?: boolean
}

export interface Joined_Player_Game_Ratings {
	player_email: string,
	game_id: number,
  developer_email: string,
	game_name: string,
	game_parameter1_name?: string,
	game_paramtere1_weight?: number,
  game_paramter1_value?: number,
  game_parameter2_name?: string,
	game_paramtere2_weight?: number,
  game_paramter2_value?: number,
  game_parameter3_name?: string,
	game_paramtere3_weight?: number,
  game_paramter3_value?: number,
  game_parameter4_name?: string,
	game_paramtere4_weight?: number,
  game_paramter4_value?: number,
  category: string,
  players_per_team: number,
  teams_per_match: number,
  is_valid?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MatchmakingApiService {

  api_url = "http://192.168.6.134:18080"

  constructor(private http: HttpClient, private auth:AuthServiceService) { }

  signUp(developer: Developer): Observable<HttpResponse<string>> {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
    };
    return this.http.post("/api/signup", developer, options);
  }

  login(developer: Developer): Observable<HttpResponse<string>> {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
    };
    return this.http.post("/api/login", developer, options);
  }

  getGames() {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", this.auth.getAPIKey())
    };
    return this.http.get<Game_Details[]>(this.api_url + "/games", options);
  }

  getGame(game_id: number) {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", this.auth.getAPIKey())
    };
    return this.http.get(this.api_url + "/games/" + game_id, options);
  }

  addGame() {

  }

  updateGame() {

  }

  deleteGame() {
    
  }

  matchmake() {

  }
}
