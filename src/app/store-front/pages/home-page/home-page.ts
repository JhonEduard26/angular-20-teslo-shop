import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product-service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly productService = inject(ProductService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productService.getProducts({
        limit: 9,
        gender: 'men',
      });
    },
  });
}
