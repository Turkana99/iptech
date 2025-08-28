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
import { Observable } from 'rxjs';
import { HomepageService } from '../../../../core/services/homepage.service';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ContactService } from '../../../../core/services/contact.service';
import { RouterModule } from '@angular/router';

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
    RouterModule
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
    private dataService: HomepageService,
    private contactService: ContactService
  ) {
    this.breadcrumbService.setBreadcrumb([]);
  }

  ngOnInit() {
    this.data$ = this.dataService.getAllData();
    this.initForm();
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
}
