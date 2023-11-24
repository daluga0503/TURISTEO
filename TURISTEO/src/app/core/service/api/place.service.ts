import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { Place } from "../../models/place";
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
        return this.api.post("sitios", place).pipe(
        tap(_ => this.getAll().subscribe())
        );
    }

    public getAll(): Observable<Place[]> {
        return this.api.get('sitios').pipe(
        map(response => {
            return response.map((placeData: any) => this.mapToPlace(placeData));
        }),
        tap(places => this._places.next(places))
        );
    }

    private mapToPlace(data: any): Place {
        return {
            placeId: data.id,
            placeName: data.placeName,
            city: data.city,
            photo: data.photo,
            typePlace: data.typePlace,
        };
    }
}