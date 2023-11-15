import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {


  //Mantiene el idioma actual, inicialmente establecido en ingles.
  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('en');
  //Variable que funciona como observable que permite la suscripcion de otros componentes 
  //para recibir una notificacion en ela modificacion del idioma.
  public language$ = this._language.asObservable();


  constructor(private translate: TranslateService) { 
    this.init();
  }

  //Método en el que se establece los idiomas permitidos con el addLangs, y establece el idioma predeterminado con el valor de _langauge.
  private init(){
    this.translate.addLangs(['en','es']);
    this.translate.setDefaultLang(this._language.value);
  }

  //Método que informa que el idioma se ha modificado, notificando a los suscriptores de _lenguage su nuevo valor
  public useLanguage(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });
  }

  //Método para obtener el idioma actual
  public getLanguage(){
    return this.translate.currentLang;
  }

  //Método para obtener el idioma por defecto
  public defaultLang(language:string){
    return this.translate.setDefaultLang(language);
  }

  //Método que devuelve un observable que emite la traducción asociada a la clave key proporcionada cuando este libre.
  public getKeyLanguage(key:string):Observable<string>{
    return this.translate.get(key);
  }
}