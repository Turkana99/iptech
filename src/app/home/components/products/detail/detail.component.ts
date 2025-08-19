import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.PRODUCTS,
      },
      {
        path: AppRoutes.PRODUCTS,
        name: 'DETAAL',
      },
    ]);
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
