import { Author } from './Author'
import { Genre } from './Genre'
import { Pagination } from './Pagination'

export interface Book {
  _id: string
  isbn: string
  title: string
  image: string
  publisher: string
  publishedDate: string
  status: string
  authors: Author[]
  genres: Genre[]
}

export interface BorrowedBooks {
  _id: string
  isbn: string
  title: string
  image: string
  publisher: string
  publishedDate: string
  status: string
  borrowDate: string;
  borrowerId: string;
  returnDate: string;
  authors: Author[]
  genres: Genre[]
}

export interface BooksReducerState {
  books: Book[]
  loading: boolean
  error?: string;
  pagination?: Pagination;
}


export interface BorrowBooksResponse {
  status: string;
  data: {
    borrowedBooks: string[];
  };
}
