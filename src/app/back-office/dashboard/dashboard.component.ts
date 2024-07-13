import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { Chart } from 'chart.js';
import { ReclamationService } from 'src/app/reclamation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chartData: any = {};
  public chartData2: any = {};
  constructor(private userService: UserService, private reclamationService: ReclamationService) { }

  
  ngOnInit(): void {
    this.userService.getUsersByRole().subscribe(
      data => {
        this.chartData = {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Number of Users',
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
              data: Object.values(data)
            }
          ]
        };
        this.createChart();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.reclamationService.getReclamationByStatus().subscribe(
      data => {
        this.chartData2 = {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Number of Reclamations by Status',
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
              data: Object.values(data)
            }
          ]
        };
        this.createChartReclamations();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createChart(): void {
    const ctx = document.getElementById('userRolesChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'pie', // Change chart type to pie
        data: this.chartData,
        options: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    } 
  }
  createChartReclamations(): void {
    const ctx = document.getElementById('reclamationStatuschart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'pie', // Corrected to line for line chart
        data: this.chartData2,
        options: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
      
    } 
  }
}
