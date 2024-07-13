import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/back-office/users/Dto/User';
import { UserService } from 'src/app/back-office/users/user.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild('usersTable') usersTable!: ElementRef;
  public users: User[] = [];
  public isLoading = false;
  public errorOccurred = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.displayUsers();
  }
  exportAsPDF(): void {
    const doc = new jsPDF();
    const table = this.usersTable.nativeElement;

    html2canvas(table).then((canvas) => {
      // Convert the canvas to an image and add it to the PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // mm (A4 landscape)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('users-list.pdf');
    });
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
