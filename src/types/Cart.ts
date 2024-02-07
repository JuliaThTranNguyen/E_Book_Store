import { Book } from './Book'

export interface CartItem extends Book {
  quantity: number
}


export interface CartReducerState {
  cart: CartItem[];
}

export interface AddToCartPayload {
  book: Book;
  quantity?: number; 
}