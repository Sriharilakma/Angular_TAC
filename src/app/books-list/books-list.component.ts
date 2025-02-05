import { Component } from '@angular/core';
import { IBook } from '../model/interface/books';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from '../book-details/book-details.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,BookDetailComponent, LoadingSpinnerComponent],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BookListComponent {
  books: IBook[] = [];
  selectedBook: IBook | null = null;
  loading: boolean = true;
  detailsLoading: boolean = false; // Loading for viewing book details


  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true; // Set loading to true when starting to load
    setTimeout(() => { // Simulate loading delay
      this.books = this.bookService.getBooks();
      this.loading = false; // Set loading to false when loading is complete
    }, 1000); // Delay for 1 second for the demo
  }
  // Emit selected book
  viewDetails(book: IBook): void{
    this.detailsLoading = true;
    setTimeout(() => {
      this.selectedBook = book;
      this.detailsLoading = false;
    }, 500); // Simulated delay for loading details
  }

  onBookDeleted(bookId: number): void {
    // Remove the deleted book from the books list immediately
    this.books = this.books.filter(book => book.id !== bookId);
    this.selectedBook = null; // Close the book details view
  }

}
