import { Component, input } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image-pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.css',
})
export class ProductCarousel {
  images = input.required<string[]>();
}
