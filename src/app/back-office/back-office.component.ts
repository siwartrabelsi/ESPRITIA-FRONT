import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent {
  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['/back-office']);
    }
    else if (localStorage.getItem('role') === 'President' || localStorage.getItem('role') === 'Membre' || localStorage.getItem('role') === 'Conducteur' || localStorage.getItem('role') === 'Passager' || localStorage.getItem('role') === 'Organisateur') {
      this.router.navigate(['/front-office']);
    }
    else {
      this.router.navigate(['/']);
    }
  }
  disconnect(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
