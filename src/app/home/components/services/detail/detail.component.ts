import { Component, OnInit } from '@angular/core';
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
export class DetailComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.SERVICES,
      },
      {
        path: AppRoutes.SERVICES,
        name: 'detaaali',
      },
    ]);
  }

  ngOnInit(): void {}

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }
}
