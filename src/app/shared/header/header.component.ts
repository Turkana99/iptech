import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { AppRoutes } from '../../home/home.routes';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';
import { LanguageService } from '../../core/services/language.service';
import { Languages } from '../../core/languages';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent, CommonModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  routes = AppRoutes;
  routes$!: Observable<string[]>;
  currentLang!: string;
  langs: any[] = [
    {
      culture: Languages.AZ,
      displayName: 'Az',
    },
    {
      culture: Languages.EN,
      displayName: 'En',
    },
    {
      culture: Languages.RU,
      displayName: 'Ru',
    },
  ];

  data$ = this.languageService.getAll().pipe(
    tap((response: any) => {
      this.langs = response;
      if (!this.languageService.getLanguage()) {
        this.languageService.setLanguage(
          response.find((lang: any) => {
            return lang.displayName.toLowerCase() === 'az';
          })
        );
      }

      // this.currentLang = this.languageService
      //   .getLanguage()
      //   .displayName.toUpperCase();
    })
  );
  constructor(private router: Router, public languageService: LanguageService) {
    //Language API qoshulandan sonra 48-ci setir commentden cixib bu commente girecek
    this.currentLang = this.languageService
      .getLanguage()
      .displayName.toUpperCase();
  }

  changeLanguage(language: any) {
    this.languageService.setLanguage(language);
    location.reload();
  }
}
