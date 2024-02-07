import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import cartReducer from './reducers/cartReducer'
import { CartItem } from '../types/Cart'
import { initialState } from './reducers/authReducer'
import booksReducer from './reducers/booksReducer'
import authReducer from './reducers/authReducer'
import { UserReducerState } from '../types/User'
import accountManagementReducer from './reducers/accountManagementReducer'
import { ReturnCartItem } from '../types/ReturnCart'

const preLoadedCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem('cart') || '[]'
)

const preLoadedUserReducer: UserReducerState = JSON.parse(
  localStorage.getItem('user') || JSON.stringify(initialState)
);

const preLoadedBorrowedItemsReducer: ReturnCartItem[] = JSON.parse(
  localStorage.getItem('accountManagement') || '[]'
)


export const createStore = () =>
  configureStore({
    reducer: {
      book: booksReducer,
      auth: authReducer,
      cart: cartReducer,
      accountManagement: accountManagementReducer,
    }
    ,
    preloadedState: {
      cart: preLoadedCartReducer,
      auth: {
        ...preLoadedUserReducer,
        access_Token: localStorage.getItem('accessToken') || null,
      },
      accountManagement: preLoadedBorrowedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  })

const store = createStore()

const updateLocalStorage = () => {
  const cart = store.getState().cart
  const accountManagement = store.getState().accountManagement
  const userCredentials = store.getState().auth
  const access_Token = store.getState().auth.access_Token

  if (access_Token) {
    localStorage.setItem("accessToken", access_Token);
  }
  localStorage.getItem("accessToken");

  localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem('accountManagement', JSON.stringify(accountManagement))
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...userCredentials,
      auth: {
        role: userCredentials.user?.email,
        image: userCredentials.user?.image,
      },
    })
  )
}

store.subscribe(updateLocalStorage)
setupListeners(store.dispatch)

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
