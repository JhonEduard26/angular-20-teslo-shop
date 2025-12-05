import { Component, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input<number>(1);
  pages = input<number>(0);
  activePage = linkedSignal(this.currentPage);

  getPageArray() {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  }
}
