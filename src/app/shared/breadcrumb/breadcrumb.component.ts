import { Component } from '@angular/core';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  constructor(private breadcrumbService: BreadcrumbService) {}

  breadCrumb$ = this.breadcrumbService.breadCrumb$;
}
