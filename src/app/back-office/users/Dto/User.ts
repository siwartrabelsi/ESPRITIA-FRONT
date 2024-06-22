export interface User{
    id: number;
    nom: string;
    email: string;
    motDePasse: string;
    banned: boolean;
    role: string;
}