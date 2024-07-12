import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BadWordService } from 'src/app/bad-word.service';
import { Reclamation } from 'src/app/models/reclamation.model';
import { ReclamationService } from 'src/app/reclamation.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent {
  public reclamations: Reclamation[] = [];
  public isLoading = false;
  public errorOccurred = false;
  public replyMessage!: string;
  public selectedStatus!: string;
  sentimentsByUser: any = {};

  constructor(
    private reclamationservices: ReclamationService,
    private router: Router,
    private badWordService: BadWordService
  ) {}

  ngOnInit(): void {
    this.displayReclamations();
    this.fetchSentiments();
  }

  getPlaceholder(statut: string | undefined): string {
    return statut === 'TREATED' ? 'No response yet' : 'Write your response here...';
  }

  getImageUrl(imageFileName: string | undefined): string {
    return `http://localhost:9090/uploads/${imageFileName}`;
  }

  displayReclamations(): void {
    this.isLoading = true;
    this.reclamationservices.displayReclamations().subscribe(
      (rec: Reclamation[]) => {
        this.reclamations = rec.map((reclamation: Reclamation) => ({
          ...reclamation,
          description: this.badWordService.filterBadWords(reclamation.description)
        }));
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
        this.errorOccurred = true;
        this.isLoading = false; // Ensure loading spinner is turned off on error
      },
      () => {
        this.isLoading = false; // Turn off loading spinner when complete
      }
    );
  }

  replyToReclamation(reclamation: Reclamation): void {
    console.log(reclamation)
    this.reclamationservices.replyToReclamation(reclamation.id, reclamation).subscribe(
      (updatedReclamation: Reclamation) => {
        this.displayReclamations()
      },
      (error) => {
        console.error('Error replying to reclamation:', error);
      }
    );
  }
  fetchSentiments(): void {
    this.reclamationservices.getReclamationsSentiments().subscribe(
      (sentiments: any) => {
        this.sentimentsByUser = sentiments;
      },
      (error) => {
        console.error('Error fetching sentiments:', error);
      }
    );
  }
}

