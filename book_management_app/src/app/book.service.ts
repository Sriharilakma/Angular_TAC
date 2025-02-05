import { Injectable } from '@angular/core';
import { IBook } from './model/interface/books';
import { MockBooks } from '../assets/mock-data/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'addedBooks';

  constructor() {}

  // Get all books (predefined + newly added)
  getBooks(): IBook[] {
    const storedBooks = this.getStoredBooks();
    return [...MockBooks, ...storedBooks]; // Combine mock and stored books
  }

  // Get a book by ID
  getBookById(id: number): IBook | undefined {
    return this.getBooks().find(book => book.id === id);
  }

  // Add a new book and store in local storage
  addBook(book: IBook): void {
    const storedBooks = this.getStoredBooks();
    storedBooks.push(book);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedBooks));
  }

  // Delete only newly added books from local storage
  deleteBook(id: number): void {
    const storedBooks = this.getStoredBooks();
    const updatedBooks = storedBooks.filter(book => book.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedBooks));
  }

  // Retrieve books from local storage
  private getStoredBooks(): IBook[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }
}
