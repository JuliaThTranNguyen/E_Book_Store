import { Author } from "./Author";
import { Book } from "./Book";
import { Genre } from "./Genre";

export interface BookApiResponse {
  status: string;
  data: {
    books: Book[];
    pagination: Pagination;
  };
}

export interface AuthorApiResponse {
  status: string;
  data: {
    authors: Author[];
    pagination: Pagination;
  };
}

export interface GenreApiResponse {
  status: string;
  data: {
    genres: Genre[];
    pagination: Pagination;
  };
}

export interface Pagination {
    page: number;
    totalPages: number;
  }
  