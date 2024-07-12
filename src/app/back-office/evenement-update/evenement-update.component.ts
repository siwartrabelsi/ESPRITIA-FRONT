import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../../evenement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evenement-update',
  templateUrl: './evenement-update.component.html',
  styleUrls: ['./evenement-update.component.css'],
})
export class EvenementUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  evenementId!: number;

  constructor(
    private evenementService: EvenementService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['', Validators.required],
      siteweb: ['', Validators.required],
      capacite: ['', Validators.required],
      nbrParticipant: ['', Validators.required],
      affiche: [null],
    });

    this.route.paramMap.subscribe((params) => {
      this.evenementId = +params.get('id')!;
      this.loadEvenementDetails();
    });
  }

  loadEvenementDetails(): void {
    this.evenementService.getEvenement(this.evenementId).subscribe(
      (evenement: any) => {
        console.log(evenement);
        this.updateForm.patchValue({
          nom: evenement.nom,
          date: evenement.date,
          dateFin: evenement.dateFin,
          statut: evenement.statut,
          siteweb: evenement.siteweb,
          capacite: evenement.capacite,
          nbrParticipant: evenement.nbrParticipant,
        });

        if (evenement.affiche && evenement.affiche.length > 0) {
          this.updateForm.patchValue({ affiche: evenement.affiche });
        }
      },
      (error) => {
        console.log(
          "Erreur lors de la récupération des détails de l'événement :",
          error
        );
      }
    );
  }

  onUpdateEvenement(): void {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.updateForm.get('nom')!.value);
      formData.append('date', this.updateForm.get('date')!.value);
      formData.append('dateFin', this.updateForm.get('dateFin')!.value);
      formData.append('statut', this.updateForm.get('statut')!.value);
      formData.append('siteweb', this.updateForm.get('siteweb')!.value);
      formData.append('capacite', this.updateForm.get('capacite')!.value);
      formData.append(
        'nbrParticipant',
        this.updateForm.get('nbrParticipant')!.value
      );
      formData.append('affiche', this.updateForm.get('affiche')!.value);

      this.evenementService
        .updateEvenement(this.evenementId, formData)
        .subscribe(
          (response: any) => {
            console.log('Événement mis à jour avec succès', response);
            this.toastr.success('Événement mis à jour avec succès', 'Succès');
            this.router.navigate(['/back-office/listEvent']);
          },
          (error) => {
            console.log(
              "Erreur lors de la mise à jour de l'événement : ",
              error
            );
          }
        );
    } else {
      console.log('Le formulaire est invalide');
      this.toastr.error('Le formulaire est invalide', 'Erreur');
    }
  }

  onFileChangeAffiche(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.updateForm.patchValue({ affiche: file });
  }
}
