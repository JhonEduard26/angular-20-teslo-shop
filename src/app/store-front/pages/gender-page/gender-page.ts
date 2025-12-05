import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { I18nSelectPipe } from '@angular/common';
import { map } from 'rxjs';

import { ProductService } from '@products/services/product-service';
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/services/pagination-service';

@Component({
  selector: 'app-gender-page',
  imports: [I18nSelectPipe, ProductCard, Pagination],
  templateUrl: './gender-page.html',
  styleUrl: './gender-page.css',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  protected readonly paginationService = inject(PaginationService);
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));
  genderMapping: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kids: 'Niños',
  };

  productResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        limit: 9,
        gender: params.gender,
        offset: params.page * 9,
      });
    },
  });
}
