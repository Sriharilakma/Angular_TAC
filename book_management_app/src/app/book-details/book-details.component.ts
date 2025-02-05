import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../model/interface/books';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailComponent {
  @Input() book!: IBook; // Receive book from parent
  @Output() close = new EventEmitter<void>(); // Notify parent when closing
  @Output() bookDeleted = new EventEmitter<number>();

  constructor(private bookService: BookService) {}

  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.book.id); // Delete the book from local storage
      this.bookDeleted.emit(this.book.id); // Notify parent component about deletion
      this.close.emit(); // Close the details view
    }
  }
}
