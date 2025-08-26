import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { LanguageService } from '../../../../core/services/language.service';
import { ServiceService } from '../../../../core/services/service.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  slug!: string;
  data$!: Observable<any>;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private languageService: LanguageService
  ) {
    this.slug = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.data$ = this.serviceService.getBySlug(this.slug).pipe(
      tap((data: any) => {
        this.breadcrumbService.setBreadcrumb([
          {
            path: AppRoutes.SERVICES,
          },
          {
            path: AppRoutes.SERVICES,
            name: data?.title,
          },
        ]);
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
