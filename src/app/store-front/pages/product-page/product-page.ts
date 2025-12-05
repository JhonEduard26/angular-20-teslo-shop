import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '@products/services/product-service';
import { ProductCarousel } from '@products/components/product-carousel/product-carousel';
import { Loader } from '@shared/components/loader/loader';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel, Loader],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  private readonly productService = inject(ProductService);
  protected idSlug = inject(ActivatedRoute).snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({
      idSlug: this.idSlug,
    }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.idSlug);
    },
  });
}
