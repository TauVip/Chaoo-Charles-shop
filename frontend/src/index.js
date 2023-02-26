import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import authSlice from './features/authSlice'
import cartSlice, { getTotals } from './features/cartSlice'
import { productsApi } from './features/productsApi'
import productsSlice, { productsFetch } from './features/productsSlice'

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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
