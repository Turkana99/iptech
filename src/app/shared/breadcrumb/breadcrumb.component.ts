import { Component, DestroyRef, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { Observable, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    private destroyRef: DestroyRef,
    private breadcrumbService: BreadcrumbService
  ) {}

  breadCrumb$ = new Observable<{ name: string; path: string }[]>();

  ngOnInit(): void {
    this.breadCrumb$ = this.breadcrumbService.breadCrumb$.pipe(
      tap((data: any) => {
        console.log('data', data);
      })
    );
  }
}
