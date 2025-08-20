import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LanguageService } from '../services/language.service';
import { inject } from '@angular/core';
import { Languages } from '../languages';

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const langService = inject(LanguageService);
  const culture = langService.getLanguage()?.culture || Languages.AZ;

  request = addLanguage(request, culture);

  function addLanguage(
    request: HttpRequest<any>,
    culture: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: { Language: culture },
    });
  }

  return next(request);
};
