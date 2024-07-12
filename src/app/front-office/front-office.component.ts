import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from '../reclamation.service';
import { Reclamation } from '../models/reclamation.model';

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent {
  reclamationForm: FormGroup;
  selectedImageFile!: File;
  errorOccurred!:String;
  successOccurred!:String;
  constructor(private router: Router, private formBuilder: FormBuilder, private reclamationService: ReclamationService) {
    this.reclamationForm = this.formBuilder.group({
      description: ['', Validators.required],
      image: ['']
    });
  }
  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['/back-office']);
    }
    // else if (localStorage.getItem('role') === 'President' || localStorage.getItem('role') === 'Membre' || localStorage.getItem('role') === 'Conducteur' || localStorage.getItem('role') === 'Passager' || localStorage.getItem('role') === 'Organisateur') {
    //   this.router.navigate(['/front-office']);
    // }
  }
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImageFile = inputElement.files[0];
    }
  }


  disconnect() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const descriptionControl = this.reclamationForm.get('description')?.value;
      this.reclamationService.envoyerReclamation(descriptionControl, this.selectedImageFile).subscribe(
        (response) => {
          this.errorOccurred = "";
          this.successOccurred = "Reclamation envoyée avec success";
          console.log('Reclamation created successfully:', response);
          // Optionally, navigate to another page or reset the form
          this.reclamationForm.reset();
        },
        (error) => {
          this.successOccurred ="";
          this.errorOccurred = "Fraud Detected: you must wait 2 minutes before passing another reclamation"
          console.error('Error creating reclamation:', error);
        }
      );
    }

  }
}
