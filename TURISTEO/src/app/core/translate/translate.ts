import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient){
    // devuelve las traducciones claves valor del archivo de traduccion dentro de assets
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}