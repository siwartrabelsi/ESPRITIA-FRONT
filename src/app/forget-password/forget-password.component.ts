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

  sendResetPasswordSMS(): void {
    this.error = '';
    this.authService.sendResetPasswordSMS(this.email)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/reset-password-confirm']);
        },
        error => {
          console.error('Error sending SMS', error);
          this.error = 'Failed to send reset password SMS. Please try again.';
        }
      );
  }
  register() {
    this.router.navigate(['/signup']);
  }
}