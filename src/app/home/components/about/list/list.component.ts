import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.ABOUT_US,
      },
    ]);
  }
  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
