import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';

import { JwtService } from '../jwt.service';
import { ApiService } from './api.service';
import { User } from '../../models/user';



@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

    protected _logged = new BehaviorSubject<boolean>(false);
    public isLogged$ = this._logged.asObservable();

    protected _user = new BehaviorSubject<User|null>(null);
    public user$ = this._user.asObservable();

    protected _userIdSubject: BehaviorSubject<number |null> = new BehaviorSubject<number | null>(null);
    public userId$: Observable<number | null> = this._userIdSubject.asObservable();


    
    public abstract login(credentials:Object):Observable<any>;

    public abstract register(info:Object):Observable<any>;

    public abstract logout():Observable<void>;

    public abstract me():Observable<any>;
}