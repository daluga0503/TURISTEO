import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { Attributes, Place } from "../../models/place";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";


@Injectable({
    providedIn: 'root'
})
    export class PlaceService {

    constructor(private api: ApiService) { }

    private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
    public places$: Observable<Place[]> = this._places.asObservable();

    public addPlace(place: Place): Observable<Place> {
        return this.api.post("/sitios", {
          data: {
            //id: place.placeId,
            name: place.name,
            photo: place.photo,
            city: place.city,
            //typtPlace: place.typePlace,
            typePlace: place.typePlace
          },
        }).pipe(
          tap(
            (response: any) => {
              console.log('Response from addPlace:', response);

              this.getAll().subscribe();
            },
            (error) => {
              console.error('Error in addPlace:', error);
            }
          )
        );
      }
      

      public getAll(): Observable<Place[]> {
        return this.api.get('/sitios').pipe(
          map(response => {
            const places = response.data.map(({ id, attributes }: { id: number, attributes: Attributes }) => this.mapToPlace({ id, ...attributes }));
            this._places.next(places);
            return places;
          })
        );
      }


    public query(q:string):Observable<Place[]>{
        return this.api.get('/sitios?q='+q)
    }

    private mapToPlace(data: any): Place {
        return {
            placeId: data.id,
            name: data.name,
            city: data.city,
            photo: data.photo,
            typePlace: data.typePlace,
        };
    }
}