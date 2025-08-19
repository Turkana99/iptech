import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { FormBuilder } from '@angular/forms';
import { AppRoutes } from '../../../home.routes';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
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
}
