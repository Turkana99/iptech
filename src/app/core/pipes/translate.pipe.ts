import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(key: string): any {
    const keys = key.split('.');
    let result: any = this.languageService.getTranslate();

    for (const k of keys) {
      result = result[k];
    }

    return result;
  }
}
