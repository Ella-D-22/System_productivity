import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Appclient';
  elem: any;


  sideBarOpen = true;

  constructor(
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit(): void {
    // this.elem = document.documentElement;
    // this.openFullscreen();
  }

  // @HostListener('document:fullscreenchange', ['$event'])
  //  @HostListener('document:webkitfullscreenchange', ['$event'])
  //  @HostListener('document:mozfullscreenchange', ['$event'])
  //  @HostListener('document:MSFullscreenChange', ['$event'])

  // openFullscreen() {
  //   if (this.elem.requestFullscreen) {
  //     this.elem.requestFullscreen();
  //   } else if (this.elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     this.elem.mozRequestFullScreen();
  //   } else if (this.elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.elem.webkitRequestFullscreen();
  //   } else if (this.elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     this.elem.msRequestFullscreen();
  //   }
  // }
}
