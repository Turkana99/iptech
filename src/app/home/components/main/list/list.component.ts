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
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  appealForm!: FormGroup;
  requestSent = false;

  constructor(
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setBreadcrumb([]);
  }

  ngOnInit() {
    this.initForm();
  }

  partners = [
    'assets/images/partners/Klarna.png',
    'assets/images/partners/MoneyGram.png',
    'assets/images/partners/OpenSea.png',
    'assets/images/partners/Payoneer.png',
    'assets/images/partners/WesternUnion.png',
  ];

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
