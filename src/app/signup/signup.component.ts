import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  nom!: string;
  email!: string;
  motDePasse!: string;
  role: string = "";
  roles: string[] = ['Admin', 'President', 'Membre', 'Conducteur', 'Passager', 'Organisateur'];
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['/back-office']);
    }
    else if (localStorage.getItem('role') === 'President' || localStorage.getItem('role') === 'Membre' || localStorage.getItem('role') === 'Conducteur' || localStorage.getItem('role') === 'Passager' || localStorage.getItem('role') === 'Organisateur') {
      this.router.navigate(['/front-office']);
    }
  }
  login(){
    this.router.navigate(['/login']);
  }
  register() {
    const signupRequest = {
      nom: this.nom,
      email: this.email,
      motDePasse: this.motDePasse,
      role: this.role
    };
    
    this.authService.signup(signupRequest).subscribe(response => {
      // Handle successful registration
      console.log('Registration successful:', response);
      this.router.navigate(['/']);
    }, error => {
      // Handle error
      console.error('Registration error:', error);
    });
  }
}
