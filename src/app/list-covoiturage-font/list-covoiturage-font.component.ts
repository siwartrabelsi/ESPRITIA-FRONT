import { Component } from '@angular/core';

@Component({
  selector: 'app-list-covoiturage-font',
  templateUrl: './list-covoiturage-font.component.html',
  styleUrls: ['./list-covoiturage-font.component.css']
})
export class ListCovoiturageFontComponent {

  gotocovoiturage(){
    location.href ="http://localhost:4200/front-office/coiturage-front";
  }

}
