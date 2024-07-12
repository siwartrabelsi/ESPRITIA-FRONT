import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/participant';
import { ParticipantService } from 'src/app/participant.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {
  participants: Participant[] = [];

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }
  
  loadParticipants(): void {
    this.participantService.getAllParticipants().subscribe(
      (participants: Participant[]) => {
        this.participants = participants;
      },
      (error) => {
        console.log('Erreur lors du chargement des participants:', error);
      }
    );
  } 
 
  deleteParticipant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce participant ?')) {
      console.log('Deleting participant with id:', id); // Log before deletion
      this.participantService.deleteParticipant(id).subscribe(
        () => {
          console.log('Participant deleted successfully'); // Log after successful deletion
          // Supprimer le participant de la liste locale
          this.participants = this.participants.filter(participant => participant.id !== id);
        },
        (error) => {
          console.log('Erreur lors de la suppression du participant:', error);
        }
      );
    }
  }

}
