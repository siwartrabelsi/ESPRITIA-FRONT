import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.css']
})
export class ResetPasswordConfirmComponent {
  resetCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.authService.resetPassword(this.email, this.resetCode, this.newPassword)
    .subscribe(
      (response: any) => {
        console.log('Response:', response);

        // Check response if needed
        if (response === 'Reset password SMS sent successfully') {
          console.log('Password reset successful');
          this.router.navigate(['/login']); // Redirect to login page after successful password reset
        } else {
          console.error('Unexpected response:', response);
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.error('Error resetting password:', error);

        // Example: Handling specific error message from backend
        if (error.error === 'Bad reset code') {
          this.error = 'Incorrect reset code. Please check and try again.';
        } else {
          this.error = 'Failed to reset password. Please try again.';
        }
      }
    );
  }
}

