import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product-service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/services/pagination-service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly productService = inject(ProductService);
  protected readonly paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        limit: 9,
        offset: params.page * 9,
      });
    },
  });
}
