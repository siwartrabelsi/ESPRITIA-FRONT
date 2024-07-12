
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { EvenementService } from 'src/app/evenement.service';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css'],
})
export class EvenementFormComponent implements OnInit {
  badWords = ['badword1', 'badword2', 'badword3'];

  evenementForm: FormGroup;
  affiche: File | null = null;
  rating: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private evenementService: EvenementService
  ) {
    this.evenementForm = this.fb.group(
      {
        nom: ['', [Validators.required, Validators.minLength(3)]],
        date: ['', [Validators.required, this.dateFutureValidator]],
        dateFin: ['', Validators.required],
        statut: ['', Validators.required],
        siteweb: ['', Validators.required],
        capacite: [0, Validators.required],
        nbrParticipant: [0, Validators.required],
        affiche: [null, Validators.required],
        rating: [
          0,
          [Validators.required, Validators.min(0), Validators.max(5)],
        ],
      },
      {
        validators: [
          this.dateComparisonValidator('date', 'dateFin'),
          this.capacityValidator('capacite', 'nbrParticipant'),
        ],
      }
    );
  }

  ngOnInit(): void {}

  dateFutureValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today ? null : { dateFuture: true };
  }

  dateComparisonValidator(startDate: string, endDate: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startDate)?.value;
      const end = group.get(endDate)?.value;
      return new Date(end) > new Date(start) ? null : { dateComparison: true };
    };
  }

  capacityValidator(capacity: string, participants: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const capacite = group.get(capacity)?.value;
      const nbrParticipant = group.get(participants)?.value;
      return nbrParticipant <= capacite ? null : { capacityExceeded: true };
    };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.affiche = input.files[0];
      this.evenementForm.patchValue({ affiche: this.affiche });
    }
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.evenementForm.patchValue({ rating: rating });
  }

  onSubmit(): void {
    if (this.evenementForm.valid && this.affiche) {
      const nomEvenement = this.evenementForm.get('nom')?.value.toLowerCase();
      if (this.containsBadWord(nomEvenement)) {
        alert("Le nom de l'événement contient des mots interdits.");
        return;
      }

      const formData = new FormData();
      formData.append('nom', this.evenementForm.get('nom')?.value);
      formData.append('date', this.evenementForm.get('date')?.value);
      formData.append('dateFin', this.evenementForm.get('dateFin')?.value);
      formData.append('statut', this.evenementForm.get('statut')?.value);
      formData.append('siteweb', this.evenementForm.get('siteweb')?.value);
      formData.append('capacite', this.evenementForm.get('capacite')?.value);
      formData.append(
        'nbrParticipant',
        this.evenementForm.get('nbrParticipant')?.value.toString()
      );
      formData.append('affiche', this.affiche, this.affiche.name);
      formData.append(
        'rating',
        this.evenementForm.get('rating')?.value.toString()
      );

      this.evenementService.addEvenement(formData).subscribe(() => {
        this.router.navigate(['/back-office/listEvent']);
      });
    }
  }

  containsBadWord(nom: string): boolean {
    return this.badWords.some((badWord) => nom.includes(badWord));
  }
}
