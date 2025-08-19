import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LanguageService } from './language.service';
import { AppRoutes } from '../../home/home.routes';

export interface BreadcrumbData {
  name?: string | AppRoutes;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadCrumb$ = new BehaviorSubject<BreadcrumbData[]>([]);
  translate: any;
  constructor(private languageService: LanguageService) {
    this.translate = this.languageService.getTranslate();
  }

  setBreadcrumb(breadcrumbData: BreadcrumbData[]) {
    const breadcrumbs: BreadcrumbData[] = [
      {
        name: this.translate[AppRoutes.HOME],
        path: '/' + AppRoutes.HOME,
      },
    ];

    let previousRoute = '/' + AppRoutes.HOME;
    for (let index = 0; index < breadcrumbData.length; index++) {
      const element = breadcrumbData[index];
      element.name = element.name || this.translate[element.path];
      element.path = previousRoute + '/' + element.path;
      previousRoute = element.path;
      breadcrumbs.push(element);
    }

    Promise.resolve().then(() => {
      this.breadCrumb$.next(breadcrumbs);
    });
  }
}
