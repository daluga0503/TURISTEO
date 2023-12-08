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
    /*
    this.jwtSvc.loadToken().subscribe(
      {
        next:(logged)=>{
          this._logged.next(logged!='');
        },
        error:(err)=>{
          console.log("No hay token", err);
        }
      }      
    );*/

    this.jwtSvc.loadToken().subscribe(token=>{
      if(token){
        this.me().subscribe(user=>{
          this._logged.next(true);
          this._user.next(user);
        })
      }else{
        this._logged.next(false);
        this._user.next(null);
      }
    });
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
      //this._userIdSubject.next(null); //reinicio el id del usuario
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
              //user_id:data.user.id
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
            let extended_user: StrapiArrayResponse<StrapiExtendedUser> = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[users_permissions_user]=${user.id}`));
              let ret: User = {
                id:user.id,
                name:user.username,
                surname:user.email,
                nickname:user.email
                //name:extended_user.data[0].attributes.data.name,
                //surname:extended_user.data[0].attributes.data.surname,
                //nickname:extended_user.data[0].attributes.nickname
              }
              obs.next(ret);
              obs.complete();
        },
        error: err => {
          obs.error(err);
        }
      });
    });
  }  

}