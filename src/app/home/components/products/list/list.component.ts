import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultPaginatorOptions,
  IPaginatorOptions,
} from '../../../../core/consts';
import { ProductService } from '../../../../core/services/product.service';
import { LanguageService } from '../../../../core/services/language.service';
import { MaterialModule } from '../../../../core/material.module';
import { HomepageService } from '../../../../core/services/homepage.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule],
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
    private route: ActivatedRoute,
    private homepageService: HomepageService
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.PRODUCTS,
      },
    ]);
  }
  ngOnInit(): void {
    this.data$ = combineLatest([
      this.page$.pipe(
        switchMap((page) => {
          return this.dataService.getList(page);
        })
      ),
      this.dataService.getProductPageData(),
      this.homepageService.getHomepage(),
    ]).pipe(
      map(([products, productPage, homepage]) => {
        return {
          products,
          productPage,
          homepage,
        };
      })
    );
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
