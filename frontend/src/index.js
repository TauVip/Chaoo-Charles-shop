import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import authSlice, { loadUser } from './slices/authSlice'
import cartSlice, { getTotals } from './slices/cartSlice'
import { productsApi } from './slices/productsApi'
import productsSlice, { productsFetch } from './slices/productsSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
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
