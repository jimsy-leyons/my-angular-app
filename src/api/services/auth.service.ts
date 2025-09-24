import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SigninDto } from "@api/models/auth.dto";
import { API_CONSTANTS } from "@api/configs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = API_CONSTANTS.BASE_API_URL + "/auth";

  constructor(private http: HttpClient) { }

  register() {
  }

  siginIn(signinData: SigninDto) {
    return this.http.post(this.baseUrl + "/signin", signinData);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<any>(this.baseUrl + `/refresh-token`, {
      refreshToken: refreshToken,
    });
  }

  signInWithGoogle(code: string, mrole_id: number) {
    return this.http.post(this.baseUrl + `/signInWithGoogleV1`, {
      code: code,
      mrole_id: mrole_id
    });
  }
}
