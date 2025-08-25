import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnChanges {
  groupSize = 5;
  @Input() items = [];
  constructor() {}

  title = 'iptech';
  groupedItems: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    for (const key of Object.keys(changes)) {
      if (key == 'items') {
        this.items = changes[key].currentValue;
        this.groupedItems = [];
        for (let i = 0; i < this.items.length; i += this.groupSize) {
          this.groupedItems.push(this.items.slice(i, i + this.groupSize));
        }
      }
    }
  }
}
