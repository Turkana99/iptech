import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
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
import { ProductService } from '../../../../core/services/product.service';
import { LanguageService } from '../../../../core/services/language.service';
import { MaterialModule } from '../../../../core/material.module';

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
    private route: ActivatedRoute
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.PRODUCTS,
      },
    ]);
  }
  ngOnInit(): void {
    this.data$ = this.page$.pipe(
      switchMap((page) => {
        return this.dataService.getAllData(page);
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
