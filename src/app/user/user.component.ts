import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './Dto/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public isLoading = false;
  public errorOccurred = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.displayUsers();
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
        this.router.navigate(['/'])
        this.errorOccurred = true; // Set error flag or handle error state
      },
      () => {
        this.isLoading = false; // Mark loading as complete, whether successful or failed
      }
    );
  }
}
