import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const busyService = inject(BusyService);
  busyService.busy();
  return next(request).pipe(
    delay(200),
    finalize(() => busyService.idle())
  );
};
