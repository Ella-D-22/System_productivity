import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  elem: any; 
  isFullScreen!: boolean;

  constructor(

    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

username: any;
email: any;
  ngOnInit() {
    this.chkScreenMode();
    this.elem = document.documentElement;
    this.openFullscreen();
   }

  

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.tokenStorage.signOut();
    return this.router.navigate(['/']);
}





@HostListener('document:fullscreenchange', ['$event'])
   @HostListener('document:webkitfullscreenchange', ['$event'])
   @HostListener('document:mozfullscreenchange', ['$event'])
   @HostListener('document:MSFullscreenChange', ['$event'])
fullscreenmodes(){
      this.chkScreenMode();
    }
chkScreenMode(){
      if(document.fullscreenElement){
        //fullscreen
        this.isFullScreen = true;
      }else{
        //not in full screen
        this.isFullScreen = false;
      }
    }
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
/* Close fullscreen */
      closeFullscreen() {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          /* Firefox */
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          /* IE/Edge */
          this.document.msExitFullscreen();
        }
      }


}
