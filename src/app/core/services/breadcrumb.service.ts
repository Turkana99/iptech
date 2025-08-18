import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  titleChanged$ = new BehaviorSubject<string | null>(null);

  breadCrumb$ = new Observable<any>();

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    this.breadCrumb$ = combineLatest([
      this.titleChanged$,
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this.router.url, this.router.url)), // force first
        tap(() => {
          this.titleChanged$.next(null);
        })
      ),
    ]).pipe(
      map(([customTitle]) => {
        const routeSnapshot = this.router.routerState.root.snapshot;
        const breadcrumbs = this.createBreadcrumb(routeSnapshot);

        if (customTitle && breadcrumbs.length > 0) {
          breadcrumbs[breadcrumbs.length - 1].name = customTitle;
        }
        return breadcrumbs;
      })
    );
  }

  createBreadcrumb(
    route: ActivatedRouteSnapshot
  ): { name: string; path: string }[] {
    const breadcrumbs: { name: string; path: string }[] = [];
    const translate = this.languageService.getTranslate();
    function traverse(
      snapshot: ActivatedRouteSnapshot,
      parentPath: string = ''
    ) {
      if (snapshot.data?.['breadcrumb'] && snapshot.routeConfig?.path) {
        const currentPath =
          parentPath +
          '/' +
          (Object.values(snapshot.params).join('') ||
            snapshot.routeConfig.path);
        breadcrumbs.push({
          name: translate[snapshot.data['breadcrumb']],
          path: currentPath,
        });
        parentPath = currentPath;
      }

      if (snapshot.children?.length) {
        traverse(snapshot.children[0], parentPath);
      }
    }

    traverse(route);
    return breadcrumbs;
  }
}
