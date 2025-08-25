import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LanguageService } from '../services/language.service';
import { inject } from '@angular/core';
import { Languages } from '../languages';

export const languageInterceptor: HttpInterceptorFn = (request, next) => {
  const langService = inject(LanguageService);
  const code = langService.getLanguage()?.code || Languages.AZ;

  request = addLanguage(request, code);

  function addLanguage(
    request: HttpRequest<any>,
    code: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: { Language: code },
    });
  }

  return next(request);
};
