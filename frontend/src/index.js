import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import authSlice, { loadUser } from './slices/authSlice'
import cartSlice, { getTotals } from './slices/cartSlice'
import ordersSlice from './slices/ordersSlice'
import { productsApi } from './slices/productsApi'
import productsSlice, { productsFetch } from './slices/productsSlice'
import usersSlice from './slices/usersSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    orders: ordersSlice,
    users: usersSlice,
    cart: cartSlice,
    auth: authSlice,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loadUser(null))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
