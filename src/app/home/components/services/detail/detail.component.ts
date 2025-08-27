import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { LanguageService } from '../../../../core/services/language.service';
import { ServiceService } from '../../../../core/services/service.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  data$!: Observable<any>;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      switchMap((data: any) => {
        return this.serviceService.getBySlug(data.params['id']).pipe(
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
