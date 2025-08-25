import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselComponent } from '../../../../shared/carousel/carousel.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbDropdownModule,
  NgbScrollSpyModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';
import { AppRoutes } from '../../../home.routes';
import { Observable, tap } from 'rxjs';
import { HomepageService } from '../../../../core/services/homepage.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbScrollSpyModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  appealForm!: FormGroup;
  requestSent = false;
  data$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private dataService: HomepageService
  ) {
    this.breadcrumbService.setBreadcrumb([]);
  }

  ngOnInit() {
    this.data$ = this.dataService.getAllData().pipe(
      tap((data: any) => {
        console.log('data', data);
      })
    );
    this.initForm();
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
}
