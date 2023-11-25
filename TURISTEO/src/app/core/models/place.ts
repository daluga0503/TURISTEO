export enum TypePlace{
    PARK = "Park",
    MONUMENT = "Monument",
    CHURCHE = "Churche",
    CONSTRUCTION = "Construction",
    VIEWPOINT = "Viewpoint", //Mirador
    BEACH = "Beach",
}


export interface Place {
    placeId: number;
    name: string;
    photo: string;
    city:string;
    typePlace: TypePlace;
}

export interface Attributes {
    name: string;
    city: string;
    photo: string; // Ajusta el tipo según tu estructura
    typePlace: string; // Ajusta el tipo según tu estructura
    // Agrega las demás propiedades si es necesario
  }
