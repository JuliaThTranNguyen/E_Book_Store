# Topic: How to maintain your current state of application even when the page is loaded?
----------------------------------------------

## How? 
* To maintain the current state of a application, a utilize browser storage mechanisms like 'localStorage' or 'sessionStorage' can be used.

* In the context of a Redux-powered application, you can persist the state of your Redux store in localStorage. Let see how we can perform this action in our code.

### 1. Update the Redux Store to Load Initial State from localStorage:

* Modify your Redux store configuration to load initial state from localStorage when the store is created. In your store.ts file:

The example code should be something just like this:
```
const preLoadedCartReducer: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
const preLoadedUserReducer: UserReducerState = JSON.parse(localStorage.getItem('user') || JSON.stringify(initialState))

const createStore = () =>
  configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      userReducer,
      [productQueries.reducerPath]: productQueries.reducer,
    },
    preloadedState: {
      cartReducer: preLoadedCartReducer,
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productQueries.middleware),
  })

const store = createStore()

const updateLocalStorage = () => {
  const cart = store.getState().cartReducer
  const userCredentials = store.getState().userReducer

  localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...userCredentials,
      user: {
        role: userCredentials.user?.role,
        avatar: userCredentials.user?.avatar,
      },
    })
  )
}

store.subscribe(updateLocalStorage)
setupListeners(store.dispatch)

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
```
</br>

### 2. Initialize the Store with localStorage Data:

When your application starts, the Redux store will be initialized with the data from localStorage. This ensures that the application starts with the persisted state.
</br>

### 3. Avoid Overwriting State on Page Reload:

The state will be persisted in localStorage with every store update. When the page reloads, the store will be initialized with this persisted state. Therefore, the current state of the application will remain unchanged even after a page reload.

By following these steps, your application's state will persist across page reloads, providing a seamless user experience. Just ensure that sensitive information is not stored in localStorage, as it can be accessed and manipulated by the user. For sensitive data, consider server-side authentication and authorization mechanisms.

---------------------------------------------

## Code explanation:
* You can visit [redux/store.ts](./src/redux/store/store.ts) to view/copy the entire code there.

### A brieft start:
* This file is a configuration file for setting up and managing the Redux store in a Redux-powered React application. Let's break down the content of the file and its purpose step by step:

#### 1. Imports:
```
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
```
</br>
These lines import necessary functions from the Redux Toolkit. configureStore is used to create the Redux store, and setupListeners is used to set up event listeners for Redux Toolkit's query functionality.
</br>

#### 2. Reducers and Queries:
```
import productsReducer from '../reducers/productsReducer'
import productQueries from '../queries/productQueries'
import cartReducer from '../reducers/cartReducer'
```
</br>
Here, the file imports various reducers and query functions. Reducers handle state changes for specific parts of the application, while queries handle data fetching and caching logic, often used in async operations.
</br>

#### 3. Store Configuration:
```
export const createStore = () =>
  configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      userReducer,
      [productQueries.reducerPath]: productQueries.reducer,
    },
    preloadedState: {
      cartReducer: preLoadedCartReducer,
      userReducer: preLoadedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productQueries.middleware),
  })
```
</br>
This function, createStore, configures the Redux store. It combines multiple reducers into a single reducer object, adds preloaded state, and applies middleware for handling async actions, specifically from the productQueries module.
</br>

#### 4. Store Initialization:
```
const store = createStore()
```
</br>
The createStore function is invoked to create the actual Redux store, which is used by the application to manage its state.
</br>

#### 5.Local Storage Synchronization:
```
const updateLocalStorage = () => {
  const cart = store.getState().cartReducer
  const userCredentials = store.getState().userReducer

  localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...userCredentials,
      user: {
        role: userCredentials.user?.role,
        avatar: userCredentials.user?.avatar,
      },
    })
  )
}
store.subscribe(updateLocalStorage)
```
</br>
This function, updateLocalStorage, is used to keep the local storage in sync with the store's state. It gets called whenever the store's state changes and updates the localStorage with the current cart and user data.
</br>

#### 6. Event Listeners Setup:
```
setupListeners(store.dispatch)
```
</br>
This line sets up event listeners for Redux Toolkit's query actions. When these actions are dispatched, the listeners handle them appropriately.
</br>

#### 7.Export Types and Store Instance:
```
export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
```
</br>
This section exports two important types: StateType, representing the overall state structure of the Redux store, and AppDispatch, representing the type of the store's dispatch function. It also exports the configured Redux store instance as the default export of the file.
</br>

### Conclusion:
In summary, this file centralizes the configuration of the Redux store, including reducers, preloaded state, middleware, local storage synchronization, and event listeners. It exports types for the store's state and dispatch function, making them available for other parts of the application.