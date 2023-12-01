import { BehaviorSubject, Observable, map } from "rxjs";
import { favPlace } from "../../models/favPlace";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: 'root'
})

export class favPlaceService{
    private _fav: BehaviorSubject<favPlace[]> = new BehaviorSubject<favPlace[]>([]);
    public fav$: Observable<favPlace[]> = this._fav.asObservable();

    constructor(
        private api: ApiService,
        private auth: AuthService){
    }

    getPlacesInterestByUser(userId: number):Observable<favPlace[]>{
        return this.api.get('/sitio-intereses?filters[usersId]=${usersId}').pipe(
            map (response => {
                const fav = response.data.map((item:any)=>{
                    const {id, attributes}=item;
                    return this.mapToFav({id, ...attributes});
                });
                this._fav.next(fav),
                console.log(fav);
                return fav;
            })
        );
    }

    addPlaceToFavorites(userId:number, placeId:number):Observable<favPlace>{
        
            const body = {
                usersId: userId,
                placesId: placeId
            };

            return this.api.post('/sitio-intereses', body).pipe(
                map (response =>{
                    const newFavPlace = this.mapToFav(response.data);
                    const currentFavPlaces = this._fav.value;
                    this._fav.next([...currentFavPlaces, newFavPlace]);
                    return newFavPlace;
                    })
                );
        }



    deletePlaceFromFavorites(userId:number, placeId:number):Observable<void>{
        return this.api.delete('/sitio-intereses?usersId=${userId}&placesId=${placeId}').pipe(
            map(()=>{
                const currentFavPlaces = this._fav.value;
                const updatedFavPlaces = currentFavPlaces.filter(favPlace => favPlace.sitiosId !== placeId);
                this._fav.next(updatedFavPlaces);
            })
        )
    }

    private mapToFav(data: any): favPlace {
        return {
            idFav: data.id,
            usersId: data.userId,
            sitiosId: data.placeId,
        };
    }

}

