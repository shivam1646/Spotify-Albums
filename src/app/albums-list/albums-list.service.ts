import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlbumsListService {

  private baseUrl: string;
  private authEndpoint: string;
  private clientId: string;
  private redirectUri: string;

  constructor(private http: HttpClient) {
  	this.baseUrl = `https://api.spotify.com/v1/`;
    this.authEndpoint = `https://accounts.spotify.com/authorize`;
  	this.clientId = `7748942146de40c1b8b413e7167d8eef`;
    this.redirectUri = `http://localhost:4200/albums-list/`;
  }

  // Fetches al list of newly released albums on Spotify.
  getNewReleaseAlbumsList(accessToken: string, nextUrl?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${accessToken}`);
    const url = nextUrl ? nextUrl : `${this.baseUrl}browse/new-releases?limit=12`;
    return this.http.get(url,{headers: headers})
  }

  getAuthEndpoint() {
    return this.authEndpoint;
  }

  getClientId() {
    return this.clientId;
  }

  getRedirectUri() {
    return encodeURIComponent(this.redirectUri);
  }
}