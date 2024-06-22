import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/back-office/users/Dto/User';
import { UserService } from 'src/app/back-office/users/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public users: User[] = [];
  public isLoading = false;
  public errorOccurred = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.displayUsers();
  }
  banUnban(id: number) {
    this.userService.bannir(id).subscribe(
      (response) => {
        console.log(response)
        this.displayUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
        // this.router.navigate(['/'])
        this.errorOccurred = true; // Set error flag or handle error state
      },
      () => {
        this.isLoading = false; // Mark loading as complete, whether successful or failed
      }
    );
  }
  remove(id: number) {
    this.userService.remove(id).subscribe(
      (response) => {
        console.log(response)
        this.displayUsers();
      },
      (error) => {
        console.error('Error fetching users:', error);
        // this.router.navigate(['/'])
        this.errorOccurred = true; // Set error flag or handle error state
      },
      () => {
        this.isLoading = false; // Mark loading as complete, whether successful or failed
      }
    );
  }
  displayUsers() {
    this.isLoading = true;
    this.userService.displayUsers().subscribe(
      (users: User[]) => {
        console.log(users)
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
        // this.router.navigate(['/'])
        this.errorOccurred = true; // Set error flag or handle error state
      },
      () => {
        this.isLoading = false; // Mark loading as complete, whether successful or failed
      }
    );
  }
}
