import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbarClose = false;
  

  toggleMenu(){
    this.navbarClose = !this.navbarClose;

    document.body.style.overflowY = this.navbarClose ? 'scroll' : 'hidden';
    
  }


  @HostListener('window:resize', ['$event']) onResize(event:any) {
    if(event.target.innerWidth >= 1024){
      this.navbarClose = false;
    }else{
      this.navbarClose = true;
    }
      
 }
}
