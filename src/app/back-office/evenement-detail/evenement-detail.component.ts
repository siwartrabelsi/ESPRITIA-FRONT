// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from 'express';
// import { Evenement } from 'src/app/Model/Evenement';
// import { EvenementService } from 'src/app/evenement.service';



// @Component({
//   selector: 'app-evenement-detail',
//   templateUrl: './evenement-detail.component.html',
//   styleUrls: ['./evenement-detail.component.css']
// })
// export class EvenementDetailComponent {
//   evenement: Evenement | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private evenementService: EvenementService, private router:Router
//   ) { }

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.evenementService.getEvenement(id).subscribe(data => {
//       this.evenement = data;
//     });
//   }
//   updateEvenement(id: number): void {
//     this.router.navigate(['/back-office/updateEvenement', id]);
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Corrigez cette ligne
import { Evenement } from 'src/app/Model/Evenement';
import { EvenementService } from 'src/app/evenement.service';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.css']
})
export class EvenementDetailComponent implements OnInit { // Ajoutez 'OnInit' ici
  evenement: Evenement | undefined;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router // Corrigez cette ligne
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenement(id).subscribe(data => {
      this.evenement = data;
    });
  }

  goToUpdateEvenement(id: any): void {
    this.router.navigate(['/back-office/updateEvenement', id]);
  }
}
