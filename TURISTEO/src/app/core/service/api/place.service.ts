import { BehaviorSubject, Observable, map, of, switchMap, take, tap, throwError } from "rxjs";
import { Attributes, Place } from "../../models/place";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
    export class PlaceService {

    constructor(
      private api: ApiService,
      private auth: AuthService) { }

    private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
    public places$: Observable<Place[]> = this._places.asObservable();

    private _personalPlaces: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
    public personalPlaces$: Observable<Place[]> = this._personalPlaces.asObservable();

    /*
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
      }*/
    
      /*
    public addPlace(place: Place): Observable<Place> {
        return this.auth.userId$.pipe(
          take(1), //probar sin el take
          switchMap(userId => {
            if (!userId) {
              throw new Error('User ID not available');
            }
    
            return this.api.post("/sitios", {
              data: {
                userId: userId,
                name: place.name,
                photo: place.photo,
                city: place.city,
                typePlace: place.typePlace
              },
            });
          }),
        );
      }*/

      public addPlace(place: Place, userId: number): Observable<Place> {
        if (!userId) {
          throw new Error('User ID not available');
        }
      
        return this.api.post("/sitios", {
          data: {
            userId: userId,
            name: place.name,
            photo: place.photo,
            city: place.city,
            typePlace: place.typePlace
          },
        }).pipe(
          map( response => {
            const addedPlace = response.data;
              const updatedPlaces = [...this._places.value, addedPlace];

              // Notificar a los observadores sobre la lista completa de lugares actualizada
              this._places.next(updatedPlaces);

              this.getAll().subscribe();

              // Actualizar personalPlaces$ con la lista actualizada para userId
              this.getAllById(userId).subscribe();

              // Notificar a los observadores sobre el lugar recién agregado
              return addedPlace;
          })
        );
      }

      
      /*
      public getAll(): Observable<Place[]> {
        return this.api.get('/sitios').pipe(
          map(response => {
            const places = response.data.map(({ id, attributes }: { id: number, attributes: Attributes }) => this.mapToPlace({ id, ...attributes }));
            this._places.next(places);
            return places;
          })
        );
      }*/

      public getAll(): Observable<Place[]> {
        return this.api.get('/sitios?populate=*').pipe(
          map(response => {
            const places = response.data.map(({ id, attributes }: { id: number, attributes: any }) => this.mapToPlace({ id, ...attributes }));
            this._places.next(places);
            console.log(this._places);
            return places;
          })
        );
      }


      /*
      getAllById(userId: number): Observable<Place[]> {
        return this.api.get(`/sitios?filters[userId]=${userId}`).pipe(
          map(response => {
            const personalPlaces = response.data.map(({ id, attributes }: { id: number, attributes: Attributes }) => this.mapToPlace({ id, ...attributes }));
            this._personalPlaces.next(personalPlaces);
            console.log(this._personalPlaces.value)
            return personalPlaces;
          })
        );
      }*/

      getAllById(userId: number): Observable<Place[]> {
        return this.api.get(`/sitios?filters[userId]=${userId}&populate=*`).pipe(
          map(response => {
            const personalPlaces = response.data.map(({ id, attributes }: { id: number, attributes: Attributes }) => this.mapToPlace({ id, ...attributes }));
            this._personalPlaces.next(personalPlaces);
            console.log(this._personalPlaces.value)
            return personalPlaces;
          })
        );
      }

    public updatePlace(place: Place, id: number | undefined, userId: number): Observable<Place> {
      const updatedPlace = this.mapToPlaceUpdate(place)
      return this.api.put(`/sitios/${id}`,updatedPlace).pipe(
        tap(_ => {this.getAllById(userId).subscribe(), this.getAll().subscribe()})
      );
  }


  public deletePlace(place: Place, userId:number): Observable<void> {
    return this.api.delete(`/sitios/${place.placeId}`).pipe(
      tap(_ =>{this.getAll().subscribe(), this.getAllById(userId).subscribe()})
      );
  }

  /*
    private mapToPlace(data: any): Place {
        return {
            placeId: data.id,
            name: data.name,
            city: data.city,
            photo: data.photo,
            typePlace: data.typePlace,
        };
    }*/

    private mapToPlace(data: any): Place {
      return {
          placeId: data.id,
          name: data.name,
          city: data.city,
          photo: data.photo.data[0]?.attributes?.url || null,
          typePlace: data.typePlace,
      };
  }

    private mapToPlaceUpdate(sitio: any): any {
      const place = {data: {
          placeId: sitio.id,
          name:sitio.name,
          city: sitio.city,
          photo: sitio.photo,
          typePlace: sitio.typePlace,
        }
        
      }
      return place;
    }
}