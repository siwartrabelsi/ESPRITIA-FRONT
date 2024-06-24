
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { EvenementService } from 'src/app/evenement.service';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css'],
})
export class EvenementFormComponent implements OnInit {
  evenementForm: FormGroup;
  affiche: File | null = null;
  rating: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private evenementService: EvenementService
  ) {
    this.evenementForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.dateFutureValidator]],
      statut: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]]

    });
  }

  ngOnInit(): void {}

  dateFutureValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to ignore the time part
    return date > today ? null : { dateFuture: true };
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.affiche = event.target.files[0];
    }
  }
  setRating(rating: number): void {
    this.rating = rating;
    this.evenementForm.patchValue({ rating: rating });
  }

  onSubmit(): void {
    if (this.evenementForm.valid && this.affiche) {
        const formData = new FormData();
        formData.append('nom', this.evenementForm.get('nom')?.value);
        formData.append('date', this.evenementForm.get('date')?.value);
        formData.append('statut', this.evenementForm.get('statut')?.value);
        formData.append('affiche', this.affiche, this.affiche.name);
        formData.append('rating', this.evenementForm.get('rating')?.value);

        this.evenementService.addEvenement(formData).subscribe(() => {
            this.router.navigate(['listEvent']);
        });
        this.router.navigate(['listEvent']);
    }
}

}
