import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { IBook } from '../model/interface/books';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BookFormComponent {
  newBook: IBook = {
    id: 0,
    title: '',
    author: '',
    publishedDate: '',
    description: '',
    image: ''
  };

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit(bookForm: any): void {
    if (bookForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    const books = this.bookService.getBooks();
    this.newBook.id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 21;
    this.bookService.addBook(this.newBook);
    this.router.navigate(['/']);
  }
}
