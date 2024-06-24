import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
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
    const resetRequest = {
      email: this.email,
    };

    this.authService.signin(resetRequest).subscribe((response: any) => {
      // Handle successful registration
      console.log('Signin successful:', response.user.role);
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