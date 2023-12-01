import { BehaviorSubject, Observable, lastValueFrom, map } from 'rxjs';
import { JwtService } from '../../jwt.service';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserRegisterInfo } from 'src/app/core/models/user-register-info';
import { User } from 'src/app/core/models/user';
import { UserCredentials } from 'src/app/core/models/user-credentials';
import { StrapiArrayResponse, StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiMe, StrapiRegisterPayload, StrapiRegisterResponse } from 'src/app/core/models/strapi';


export class AuthStrapiService extends AuthService{

  constructor(
    private jwtSvc:JwtService,
    private apiSvc:ApiService
  ) { 
    super();
    this.init();
  }

  private async init(){
    
    this.jwtSvc.loadToken().subscribe(
      {
        next:(logged)=>{
          this._logged.next(logged!='');
        },
        error:(err)=>{
          console.log("No hay token", err);
        }
      }      
    );

    /*
    try {
      // si hay token se almacenará
      const token = await lastValueFrom(this.jwtSvc.loadToken());
      if (token) {
        //obtienen la infotmación del usuario
        const user = await lastValueFrom(this.me());
        //informamos al behavoiur que hay una modificación 
        this._logged.next(true);
        this._userIdSubject.next(user.id);
      } else {
        // si no hay token declaramos que no se ha podido realizar el logueo
        this._logged.next(false);
        this._userIdSubject.next(null);
      }
    } catch (error) {
      // en caso de error se establece como que tampoco se ha podido loguear.
      console.error('Error during initialization:', error);
      this._logged.next(false);
      this._userIdSubject.next(null);
    }
    */
  }

  public login(credentials:UserCredentials):Observable<void>{
    return new Observable<void>(obs=>{
      const _credentials:StrapiLoginPayload = {
        identifier:credentials.email,
        password:credentials.password
      };
      this.apiSvc.post("/auth/local", _credentials).subscribe({
        next:async (data:StrapiLoginResponse)=>{
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          this._userIdSubject.next(data.user.id); // cojo el Id y lo emito al behaviur subject
          this._logged.next(data && data.jwt!='');
          obs.next();
          obs.complete();
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }

  logout():Observable<void>{
    return this.jwtSvc.destroyToken().pipe(map(_=>{
      this._logged.next(false);
      this._userIdSubject.next(null); //reinicio el id del usuario
      return;
    }));
  }

  register(info:UserRegisterInfo):Observable<void>{
    return new Observable<void>(obs=>{
      const _info:StrapiRegisterPayload = {
        email:info.email,
        password:info.password,
        username:info.username
      }
      this.apiSvc.post("/auth/local/register", info).subscribe({
        next:async (data:StrapiRegisterResponse)=>{
          let connected = data && data.jwt!='';
          this._logged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_users:StrapiExtendedUser= {
            data:{
              name:info.name,
              surname:info.surname,
              users_permissions_user:data.user.id
            }
          }
          await lastValueFrom(this.apiSvc.post("/extended-users", _extended_users)).catch;
          obs.next();
          obs.complete();
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }
  /*
  public me():Observable<User>{
    return new Observable<User>(obs=>{
      this.apiSvc.get('/users/me').subscribe({
        next:async (user:StrapiMe)=>{
          let extended_user:StrapiArrayResponse<StrapiExtendedUser> = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[users_permissions_user]=${user.id}`));//he cambiado el []
          let ret:User = {
            id:user.id,
            name:extended_user.data[0].attributes.data.name,
            surname:extended_user.data[0].attributes.data.surname,
            nickname:extended_user.data[0].attributes.data.nickname
          }
          obs.next(ret);
          obs.complete();
        },
        error: err=>{
          obs.error(err);
        }
      });
    });
  }
  */

  
  public me(): Observable<User> {
    return new Observable<User>(obs => {
      this.apiSvc.get('/users/me').subscribe({
        next: async (user: StrapiMe) => {
          try {
            let extended_user: StrapiArrayResponse<StrapiExtendedUser> = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[users_permissions_user]=${user.id}`));
  
            // Comprobar si hay datos, atributos y datos extendidos antes de acceder a ellos
            if (
              extended_user &&
              extended_user.data &&
              extended_user.data.length > 0 &&
              extended_user.data[0].attributes &&
              extended_user.data[0].attributes.data
            ) {
              let ret: User = {
                id: user.id,
                name: extended_user.data[0].attributes.data.name || '',
                surname: extended_user.data[0].attributes.data.surname || '',
                nickname: extended_user.data[0].attributes.data.nickname || ''
              };
  
              obs.next(ret);
              obs.complete();
            } else {
              // Manejar el caso en el que no se encuentran datos válidos
              obs.error("Extended user data not found or incomplete.");
            }
          } catch (error) {
            obs.error(error);
          }
        },
        error: err => {
          obs.error(err);
        }
      });
    });
  }
  
  

}