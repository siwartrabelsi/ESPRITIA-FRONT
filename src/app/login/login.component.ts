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
  motDePasse!: string;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const signinRequest = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    // Logic for authenticating user (not implemented in this example)
    console.log('login works!');
    this.authService.signin(signinRequest).subscribe((response:any) => {
      // Handle successful registration
      console.log('Signin successful:', response);
      localStorage.setItem('accessToken', response.token);

      this.router.navigate(['/users']);
    }, error => {
      // Handle error
      console.error('Registration error:', error);
    });
  }
  register(){
    this.router.navigate(['/signup']);
  }
}
