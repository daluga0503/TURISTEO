import { BehaviorSubject, Observable, map,  tap } from "rxjs";
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

    isPlaceInFavorites(userId: number, placeId: number): boolean {
        return this._fav.value.some(fav => fav.usersId === userId && fav.sitiosId.placeId === placeId);
    }

    getFavId(usersId:number, sitiosId:number):Observable<number>{
        return this.api.get(`/sitio-intereses?filters[users_id]=${usersId}&filters[sitios_id]=${sitiosId}`).pipe(
            map( response  => response.data?.[0].id)
        )
    }

    getPlacesInterestByUser(userId: number):Observable<favPlace[]>{
        return this.api.get(`/sitio-intereses?filters[users_id]=${userId}&populate=users_id, sitios_id.photo`).pipe(
            map(response => {
                const personalfavPlaces = response.data.map(({ id, attributes }: { id: number, attributes: favPlace }) => this.mapToFav({ id, ...attributes }));
                this._fav.next(personalfavPlaces);
                console.log(this._fav.value)
                return personalfavPlaces;
            })
        );
    }

    addFavorite(userId: number, placeId: number): Observable<favPlace> {
        return this.api.post(`/sitio-intereses`, { data: { users_id: userId, sitios_id: placeId } }).pipe(
            map(response => this.mapToFav(response.data)),
            tap(newFavorite => {
            this._fav.next([...this._fav.value, newFavorite]);
        })
        );
    }

    deleteFavorite(userId:number, idFav:number):Observable<void>{
        return this.api.delete(`/sitio-intereses/${idFav}`).pipe(
            tap(_=>this.getPlacesInterestByUser(userId))
        )
    }


    private mapToFav(data: any): favPlace {
        return {
            idFav: data.id,
            usersId: data.users_id?.data?.id,
            sitiosId: {
                placeId:data.sitios_id?.data?.id,
                name: data.sitios_id?.data?.attributes?.name,
                city: data.sitios_id?.data?.attributes?.city,
                typePlace: data.sitios_id?.data?.attributes?.typePlace,
                //photo: data.sitios_id?.data?.attributes.photo?.data[0]?.attributes?.url || null
                photo: data.sitios_id?.data?.attributes.photo?.data && data.sitios_id.data.attributes.photo.data[0]?.attributes?.url || null

            }
        };
    }

}

