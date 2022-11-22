import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

export interface map {
	[key: string]: string;
}

export interface Get_Players_Response {
  [key: string]: {
    [key: string]: number
  }
}

export interface Post_Player_Request {
  [key: string]: {
    game_parameter1_value?: number,
    game_parameter2_value?: number,
    game_parameter3_value?: number,
    game_parameter4_value?: number,
  }
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
  developer_email?: string,
	game_name: string,
	game_parameter1_name?: string,
	game_parameter1_weight?: number,
  game_parameter2_name?: string,
	game_parameter2_weight?: number,
  game_parameter3_name?: string,
	game_parameter3_weight?: number,
  game_parameter4_name?: string,
	game_parameter4_weight?: number,
  category: string,
  players_per_team: number,
  teams_per_match: number,
	is_valid?: boolean
}

export interface Get_Games_Response {
	games: Game_Response_Object[]
}

export interface Game_Response_Object {
  id: number,
	name: string,
	parameters: string[],
	weights: number[],
  category: string,
  players_per_team: number,
  teams_per_match: number,
}

export interface Post_Games_Request {
	name: string,
	parameters: string[],
	weights: number[],
  category: string,
  players_per_team: number,
  teams_per_match: number,
}

export interface Post_Games_Response {
  developer_email: string,
	game_name: string,
	game_parameter1_name?: string,
	game_parameter1_weight?: number,
  game_parameter2_name?: string,
	game_parameter2_weight?: number,
  game_parameter3_name?: string,
	game_parameter3_weight?: number,
  game_parameter4_name?: string,
	game_parameter4_weight?: number,
  category: string,
  players_per_team: number,
  teams_per_match: number,
}

export interface Player_Game_Ratings {
	player_email: string,
	game_id: number,
	game_parameter1_value?: number,
  game_parameter2_value?: number,
  game_parameter3_value?: number,
  game_parameter4_value?: number,
  is_valid?: boolean
}

export interface Joined_Player_Game_Ratings {
	player_email: string,
	game_id: number,
  developer_email: string,
	game_name: string,
	game_parameter1_name?: string,
	parameter1_weight?: number,
  game_parameter1_value?: number,
  game_parameter2_name?: string,
	parameter2_weight?: number,
  game_parameter2_value?: number,
  game_parameter3_name?: string,
	parameter3_weight?: number,
  game_parameter3_value?: number,
  game_parameter4_name?: string,
	parameter4_weight?: number,
  game_parameter4_value?: number,
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

  getGames(): Observable<HttpResponse<Get_Games_Response>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.get<Get_Games_Response>("/api/games", options);
  }

  getGame(game_id: number): Observable<HttpResponse<Game_Details>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.get<Game_Details>("/api/games/" + game_id, options);
  }

  addGame(gd: Post_Games_Request): Observable<HttpResponse<Post_Games_Response>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.post<Post_Games_Response>("/api/games", gd, options);
  }

  updateGame(game_id:number, gd: Game_Details) {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.put("/api/games/" + game_id, gd, options);
  }

  deleteGame(game_id: number) {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.delete("/api/games/" + game_id, options);
  }

  getRatings(game_id: number): Observable<HttpResponse<Get_Players_Response>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.get<Get_Players_Response>("/api/games/" + game_id + "/players", options);
  }

  addRating(game_id: number, pgr: Post_Player_Request) {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.post("/api/games/" + game_id + "/players", pgr, options);
  }

  updateRating(game_id: number, pgr: Post_Player_Request) {
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.put("/api/games/" + game_id + "/players", pgr, options);
  }

  deleteRating(game_id: number, player_email: string){
    let obj = {
      player_emails: [player_email]
    };
    let options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      body: obj,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.delete("/api/games/" + game_id + "/players", options);
  }

  matchmake(game_id:number, player_emails: string[]) {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    let obj = {
      matchmaking_type: "basic",
      game_id: game_id,
      player_emails: player_emails
    }
    return this.http.post("/api/matchmake", obj, options);
  }
}
