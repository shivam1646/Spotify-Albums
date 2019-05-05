import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  header: any;
  sticky: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.header = document.getElementById("header");
    this.sticky = this.header.offsetTop;
  }

   @HostListener('window:scroll', [])
    onWindowScroll() {
      if (window.pageYOffset > this.sticky) {
        this.header.classList.add("sticky");
      } else {
        this.header.classList.remove("sticky");
      }
    }
}