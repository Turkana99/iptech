import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../home/home.routes';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  routes = AppRoutes;
}
