import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: '../../../app.component.scss',
})
export class ReviewsComponent {
  @Input() rating: number = 5; // Rating passed to the component, can be 1-5
  @Input() username: string = "";
  @Input() review: string = "";
}
