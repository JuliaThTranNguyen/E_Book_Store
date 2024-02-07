import { Pagination } from "./Pagination"

export interface Author {
    _id: number
    name: string
    bio: string
    image: string    
}

export interface AuthorsReducerState {
    authors: Author[]
    loading: boolean
    error?: string;
    pagination?: Pagination;
  }
  