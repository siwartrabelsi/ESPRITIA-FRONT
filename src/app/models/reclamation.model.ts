import { User } from "../back-office/users/Dto/User";

export class Reclamation {
    id!: number;
    user?: User;
    description!: string;
    statut?: string;
    reponse?: string;
    imageUrl?: string;
    selectedStatus?: string;
}