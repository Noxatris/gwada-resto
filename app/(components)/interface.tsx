interface Restaurant {
    id: number;
    name: string;
    description: string;
    adress: string;
    city: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    website: string;
    type_cuisine: string;
    moyenne_note: number;
    heure_ouverture: string;
    heure_fermeture: string;
    jours_ouverts: string[]; // Ex: ['Lundi', 'Mardi']
    livraison: boolean;
    statut_abonnement: 'Éco' | 'Standard' | 'Premium';
  }