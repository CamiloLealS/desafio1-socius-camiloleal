import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://codigo-alfa.cl/bootcamp-socius2024/Api/loginUser';

  constructor(private http: HttpClient) {
   }

   
   login(user: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, {
      user: user,
      password: password
    }).pipe(
      map(response => {
        if (response.success && response.jwt) {
          console.log(response.jwt);
          this.storeToken(response.jwt);
          return true;
        } else {
          return false;
        }
      })
    );
  }
    
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
        localStorage.setItem('userToken', decodedToken.data.token);
        return decodedToken.data.username || null;
      } catch (e) {
        console.error('Token decoding failed', e);
        return null;
      }
    }
    return null;
  }
}