import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-power-bi-dashboard',
  templateUrl: './power-bi-dashboard.component.html',
  styleUrls: ['./power-bi-dashboard.component.css']
})
export class PowerBiDashboardComponent implements OnInit {
  @ViewChild('powerBiDashboard', { static: true }) powerBiDashboardRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.embedDashboard();
  }

  private embedDashboard(): void {
    const config = {
      type: 'dashboard',
      accessToken: '<your-access-token>',
      embedUrl: 'https://app.powerbi.com/dashboardEmbed?dashboardId=<your-dashboard-id>',
      tokenType: 'Embed',
      settings: {
        navContentPaneEnabled: true,
        hideErrors: true
      }
    };

    // Embed the Power BI dashboard
    const powerbi = (window as any).powerbi;
    powerbi.embed(this.powerBiDashboardRef.nativeElement, config);
  }
}
