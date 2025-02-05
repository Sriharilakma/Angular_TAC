import { Routes } from '@angular/router';
import { BookListComponent } from './books-list/books-list.component';
import { ErrorComponent } from './error/error.component';
import { BookFormComponent } from './books-form/books-form.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add-book', component: BookFormComponent },
  {path: '**', component: ErrorComponent}
];