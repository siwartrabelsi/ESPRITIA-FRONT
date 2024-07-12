import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  error!: string;
  motDePasse!: string;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['/back-office']);
    }
    else if (localStorage.getItem('role') === 'President' || localStorage.getItem('role') === 'Membre' || localStorage.getItem('role') === 'Conducteur' || localStorage.getItem('role') === 'Passager' || localStorage.getItem('role') === 'Organisateur') {
      this.router.navigate(['/front-office']);
    }
  }
  login() {
    const signinRequest = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.authService.signin(signinRequest).subscribe((response: any) => {
      // Handle successful registration
      console.log('Signin successful:', response.user.role);
      localStorage.setItem('role', response.user.role);
      localStorage.setItem('id', response.user.id);
      localStorage.setItem('accessToken', response.token);
      if (response.user.role === 'Admin') {
        this.router.navigate(['/back-office']);
      }
      else {
        this.router.navigate(['/front-office']);
      }
    }, error => {
      // Handle error
      console.error('Registration error:', error.error);
      this.error = error.error;
    });
  }
  register() {
    this.router.navigate(['/signup']);
  }
}
