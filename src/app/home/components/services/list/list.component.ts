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
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultPaginatorOptions,
  IPaginatorOptions,
} from '../../../../core/consts';
import { ServiceService } from '../../../../core/services/service.service';
import { MaterialModule } from '../../../../core/material.module';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ContactService } from '../../../../core/services/contact.service';
import { HomepageService } from '../../../../core/services/homepage.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterLink,
    TranslatePipe,
  ],
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
    private dataService: ServiceService,
    private contactService: ContactService,
    private homepageService: HomepageService
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.SERVICES,
      },
    ]);
  }

  ngOnInit() {
    this.initForm();
    this.data$ = combineLatest([
      this.page$.pipe(
        switchMap((page) => {
          return this.dataService.getList(page);
        })
      ),
      this.dataService.getContactData(),
      this.dataService.getServicePageData(),
      this.homepageService.getHomepage(),
    ]).pipe(
      map(([services, contact, servicePage, homepage]) => {
        return { services, contact, servicePage, homepage };
      })
    );
  }

  getImageUrl(url: string) {
    return `url('${encodeURI(url)}')`;
  }

  initForm() {
    this.appealForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  submitAppeal() {
    if (this.appealForm.invalid) {
      this.appealForm.markAllAsTouched();
      return;
    }
    this.contactService.sendRequest(this.appealForm.value).subscribe(() => {
      this.requestSent = true;
      this.appealForm.reset();
    });
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
