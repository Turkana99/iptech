import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultPaginatorOptions,
  IPaginatorOptions,
} from '../../../../core/consts';
import { ProductService } from '../../../../core/services/product';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  data$!: Observable<any>;

  page$ = new BehaviorSubject<IPaginatorOptions>(defaultPaginatorOptions);

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dataService: ProductService,
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.PRODUCTS,
      },
    ]);
  }
  ngOnInit(): void {
    this.data$ = combineLatest([this.route.params, this.page$]).pipe(
      switchMap(([params, page]) => {
        return this.dataService.getAllData(page);
      }),
      tap((response: any) => {
        console.log('response', response);
      })
    );
    console.log(' this.data$', this.data$);
  }

  onPageChange(event: any) {
    this.page$.next({
      page: event.page + 1,
      first: event.first,
      rows: event.rows,
      pageSize: defaultPaginatorOptions.pageSize,
    });
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }

  get Language() {
    return this.languageService.getTranslate();
  }
}
