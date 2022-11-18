import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  APIKey: string = "";

  constructor(private cookieService: CookieService) { }

  checkLoginStatus(): boolean {
    if (this.cookieService.get("Matchmaking-Token") == "") {
      return false;
    } else {
      return true;
    }
  }

  login(APIKey: string) {
    this.APIKey = APIKey;
    this.cookieService.set("Matchmaking-Token", this.APIKey);
  }

  logout() {
    this.APIKey = "";
    this.cookieService.delete("Matchmaking-Token");
  }

  getAPIKey() {
    return this.cookieService.get("Matchmaking-Token");
  }
}
