import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { Observable, tap } from 'rxjs';
import { LanguageService } from '../../../../core/services/language.service';
import { AboutService } from '../../../../core/services/about.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  // data$!: Observable<any>;
  data$!: Observable<any>;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private languageService: LanguageService,
    private dataService: AboutService
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.ABOUT_US,
      },
    ]);
  }

  leftQualities: any[] = [];
  rightQualities: any[] = [];

  ngOnInit(): void {
    this.data$ = this.dataService.getAllData().pipe(
      tap((res: any) => {
        const qualities = res?.qualities as any[];
        this.leftQualities = qualities.slice(0, 2);
        this.rightQualities = qualities.slice(2, 4);
      })
    );
  }

  getLanguage() {
    return this.languageService.getTranslate();
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
