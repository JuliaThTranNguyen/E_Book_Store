import { BorrowedBooks } from "./Book";


export interface ReturnCartItem extends BorrowedBooks {
  quantity: number
}


export interface CartReducerState {
  cart: ReturnCartItem[];
}

export interface AddToCartPayload {
  book: BorrowedBooks;
  quantity?: number; 
}