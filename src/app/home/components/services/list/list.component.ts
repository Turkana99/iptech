import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import {
  defaultPaginatorOptions,
  IPaginatorOptions,
} from '../../../../core/consts';
import { ServiceService } from '../../../../core/services/service.service';
import { MaterialModule } from '../../../../core/material.module';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  appealForm!: FormGroup;
  requestSent = false;
  data$!: Observable<any>;

  page$ = new BehaviorSubject<IPaginatorOptions>(defaultPaginatorOptions);
  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private dataService: ServiceService
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.SERVICES,
      },
    ]);
  }

  ngOnInit() {
    this.initForm();
    this.data$ = this.page$
      .pipe(
        switchMap((page) => {
          return this.dataService.getAllData(page);
        })
      )
      .pipe(
        tap((data) => {
          console.log('data', data);
        })
      );
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }

  initForm() {
    this.appealForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, Validators.required],
      subject: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  submitAppeal() {
    this.appealForm.reset();
    this.requestSent = true;
  }

  onPageChange(event: any) {
    this.page$.next({
      page: event.page + 1,
      first: event.first,
      rows: event.rows,
      pageSize: defaultPaginatorOptions.pageSize,
    });
  }
}
