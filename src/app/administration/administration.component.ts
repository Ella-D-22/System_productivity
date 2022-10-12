import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  title = 'Appclient';
  elem: any;


  sideBarOpen = false;
  // sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
     this.elem = document.documentElement;
    this.openFullscreen();
  }

    sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])

 openFullscreen() {
   if (this.elem.requestFullscreen) {
     this.elem.requestFullscreen();
   } else if (this.elem.mozRequestFullScreen) {
     /* Firefox */
     this.elem.mozRequestFullScreen();
   } else if (this.elem.webkitRequestFullscreen) {
     /* Chrome, Safari and Opera */
     this.elem.webkitRequestFullscreen();
   } else if (this.elem.msRequestFullscreen) {
     /* IE/Edge */
     this.elem.msRequestFullscreen();
   }
 }

}
