import { Component } from '@angular/core';
import { LanguageService } from './core/service/lenguage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate:LanguageService
  ) {
    this.translate.useLanguage('es');
  }
}
