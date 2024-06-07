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
  role!: string;
  roles: string[] = ['Admin', 'President', 'Membre', 'Conducteur', 'Passager', 'Organisateur'];
  constructor(private authService: AuthService, private router: Router) {}

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
