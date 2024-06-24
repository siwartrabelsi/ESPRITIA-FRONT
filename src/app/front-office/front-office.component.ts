import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent {
  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['/back-office']);
    }
    else if (localStorage.getItem('role') === 'President' || localStorage.getItem('role') === 'Membre' || localStorage.getItem('role') === 'Conducteur' || localStorage.getItem('role') === 'Passager' || localStorage.getItem('role') === 'Organisateur') {
      this.router.navigate(['/front-office']);
    }
  }
  disconnect(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
}
