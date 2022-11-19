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

  updateGame(gd: Game_Details): Observable<HttpResponse<Game_Details>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.put<Game_Details>("/api/games", gd, options);
  }

  deleteGame(game_id: number): Observable<HttpResponse<Game_Details>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.delete<Game_Details>("/api/games/" + game_id, options);
  }

  getRatings(game_id: number): Observable<HttpResponse<Player_Game_Ratings[]>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.get<Player_Game_Ratings[]>("/api/games/" + game_id + "/players", options);
  }

  addRating(game_id: number, pgr: Player_Game_Ratings): Observable<HttpResponse<Player_Game_Ratings>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.post<Player_Game_Ratings>("/api/games/" + game_id + "/players", pgr, options);
  }

  updateRating(game_id: number, pgr: Player_Game_Ratings): Observable<HttpResponse<Player_Game_Ratings>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.put<Player_Game_Ratings>("/api/games/" + game_id + "/players/" + pgr.player_email, pgr, options);
  }

  deleteRating(game_id: number, player_email: string): Observable<HttpResponse<Player_Game_Ratings>> {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    return this.http.delete<Player_Game_Ratings>("/api/games/" + game_id + "/players/" + player_email , options);
  }

  matchmake(game_id:number, player_emails: string[]) {
    let options = {
      observe: 'response' as const,
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.auth.getAPIKey())
    };
    let obj = {
      game_id: game_id,
      player_emails: player_emails
    }
    return this.http.post("/api/matchmake", obj, options);
  }
}
