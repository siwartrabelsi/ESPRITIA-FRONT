import { Component, ViewChild } from '@angular/core';
import { UserService } from '../users/user.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public isLoading = false;
  public errorOccurred = false;
  public logs: any[] = [];
  @ViewChild('usersTable') usersTable: any;


  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.getAllLogs();
  }
  getAllLogs() {
    this.isLoading = true;
    this.userService.displayLogs().subscribe(
      (data: any[]) => {
        this.logs = data;
      },
      (error) => {
        console.error('Error fetching logs:', error);
        // this.router.navigate(['/'])
        this.errorOccurred = true; // Set error flag or handle error state
      },
      () => {
        this.isLoading = false; // Mark loading as complete, whether successful or failed
      }
    );
  }
  exportAsExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.usersTable.nativeElement); // Convert table element to worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logs'); // Append worksheet to workbook

    // Generate Excel file and prompt to download
    XLSX.writeFile(wb, 'logs.xlsx');
  }

}
