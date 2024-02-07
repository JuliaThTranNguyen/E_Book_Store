import { BorrowedBooks } from "./Book"

type Role = 'ADMIN' | 'USER'

export interface User {
  _id: string
  firstName: string
  lastName: string
  role: Role
  email: string
  password: string
  image: string
  borrowedBooks?: BorrowedBooks[]
}

export interface RegisterOneUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface UserReducerState {
  user: User | null
  loading: boolean
  access_Token: string | null
  isLoggedIn: boolean,
  error?: string | null | undefined
}

