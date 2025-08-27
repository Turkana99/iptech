import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { LanguageService } from '../../../../core/services/language.service';
import { Observable, switchMap, tap } from 'rxjs';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  slug!: string;
  data$!: Observable<any>;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private languageService: LanguageService
  ) {
    this.slug = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      switchMap((data: any) => {
        return this.productService.getBySlug(data.params['id']).pipe(
          tap((data: any) => {
            this.breadcrumbService.setBreadcrumb([
              {
                path: AppRoutes.PRODUCTS,
              },
              {
                path: AppRoutes.PRODUCTS,
                name: data?.title,
              },
            ]);
          })
        );
      })
    );
  }

  getLanguage() {
    return this.languageService.getTranslate();
  }

  getUrl() {
    return location.href;
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
