export interface favPlace{
    idFav:number;
    usersId:number,
    sitiosId:{
        placeId: number;
        name: string;
        city: string;
        typePlace: string;
        photo: string | null;
    };
}