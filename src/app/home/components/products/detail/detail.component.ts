import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { LanguageService } from '../../../../core/services/language.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
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
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.PRODUCTS,
      },
      {
        path: AppRoutes.PRODUCTS,
        name: 'DETAAL',
      },
    ]);
    this.slug = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('Slug in ngOnInit', this.slug);

    this.data$ = this.productService.getBySlug(this.slug).pipe(
      tap((data: any) => {
        console.log('Fetched Data', data);
        // this.breadcrumbService.titleChanged$.next(data?.title);
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
