import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent {
  @Input()
  public images : string[] = [];
  
  currentIndex: number = 0;

  nextImage() {
    const images = 3; // Total number of images
    this.currentIndex = (this.currentIndex + 1) % images;
  }

  prevImage() {
    const images = 3; // Total number of images
    this.currentIndex = (this.currentIndex - 1 + images) % images;
  }
}
