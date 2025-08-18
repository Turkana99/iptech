import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  groupSize = 5;
  constructor() {
    for (let i = 0; i < this.items.length; i += this.groupSize) {
      this.groupedItems.push(this.items.slice(i, i + this.groupSize));
    }
  }
  title = 'iptech';
  groupedItems: any = [];
  items = [
    { image: 'https://picsum.photos/400/600?random=1', alt: 'Child playing' },
    { image: 'https://picsum.photos/400/600?random=2', alt: 'Festival' },
    { image: 'https://picsum.photos/400/600?random=3', alt: 'Music' },
    { image: 'https://picsum.photos/400/600?random=4', alt: 'Nature' },
    { image: 'https://picsum.photos/400/600?random=5', alt: 'Art' },
    { image: 'https://picsum.photos/400/600?random=6', alt: 'Art' },
  ];
}
