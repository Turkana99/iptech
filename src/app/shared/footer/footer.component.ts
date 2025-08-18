import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../home/home.routes';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  routes = AppRoutes;
}
