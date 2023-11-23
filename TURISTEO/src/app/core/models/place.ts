export enum TyplePlace{
    PARK = "Park",
    MONUMENT = "Monument",
    CHURCHE = "Churche",
    CONSTRUCTION = "Construction",
    VIEWPOINT = "Viewpoint", //Mirador
    BEACH = "Beach",
}


export interface Place {
    placeId: number;
    placeName: string;
    photo: string;
    city:string;
    typePlace: TyplePlace;
}
