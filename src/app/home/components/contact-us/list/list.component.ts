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
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ContactService } from '../../../../core/services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe],
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
    private contactService: ContactService
  ) {
    this.breadcrumbService.setBreadcrumb([
      {
        path: AppRoutes.CONTACT_US,
      },
    ]);
  }

  ngOnInit() {
    this.initForm();
    this.data$ = this.contactService.getContactData();
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
