import { Component, OnInit } from '@angular/core';
import { AlbumsListService } from './albums-list.service';

@Component({
  selector: 'albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  accessToken: string = '';
  albumList: any[] = [];
  nextUrl: string = '';

  constructor(private albumsListService: AlbumsListService) { }

  ngOnInit() {
    if(localStorage.getItem("access_token")) {
      this.accessToken = localStorage.getItem("access_token");
      this.getNewReleaseAlbumsList();
    } else {
      this.getAccessToken();
    }
  }

  login() {
     const authEndpoint = this.albumsListService.getAuthEndpoint();
     const clientId = this.albumsListService.getClientId();
     const redirectUri = this.albumsListService.getRedirectUri();
     window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
  }

  getAccessToken() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
      window.location.hash = '';
      if(!hash['access_token']) {
        this.login()
      } else {
        localStorage.setItem("access_token", hash['access_token']);
        this.accessToken = localStorage.getItem("access_token");
        this.getNewReleaseAlbumsList();
      }
  }

  getNewReleaseAlbumsList() {
      this.albumsListService.getNewReleaseAlbumsList(this.accessToken).subscribe((response) => {
        this.albumList = response.albums.items;
        this.nextUrl = response.albums.next;
      }, (error) => {
        console.log('Error: ', error);  
        if(error.status === 401) {
          this.login();
        }       
      });
  }

  loadMore() {
    if(this.nextUrl) {
      this.albumsListService.getNewReleaseAlbumsList(this.accessToken, this.nextUrl).subscribe((response) => {
          if(response.albums.items.length > 0) {
            response.albums.items.forEach(item => this.albumList.push(item));
          }
          this.nextUrl = response.albums.next;
        }, (error) => {
          console.log('Error: ', error);  
          if(error.status === 401) {
            this.login();
          }   
      });
    }
  }

}