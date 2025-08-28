import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AppRoutes } from '../../home/home.routes';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    BreadcrumbComponent,
    CommonModule,
    MaterialModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  routes = AppRoutes;
  routes$!: Observable<string[]>;
  currentLang!: string;
  langs: any[] = [];
  isOpen = false;

  data$ = this.languageService.getAll().pipe(
    tap((response: any) => {
      this.langs = response.map((item: any) => {
        item.name = item.name.toUpperCase();
        return item;
      });
      if (!this.languageService.getLanguage()) {
        this.languageService.setLanguage(
          response.find((lang: any) => {
            return lang.name.toLowerCase() === 'az';
          })
        );
      }

      this.currentLang = this.languageService.getLanguage().name.toUpperCase();
    })
  );
  constructor(public languageService: LanguageService) {}

  changeLanguage(language: any) {
    this.languageService.setLanguage(language);
    location.reload();
  }
}
