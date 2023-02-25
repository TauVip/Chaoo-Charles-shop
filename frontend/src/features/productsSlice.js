import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  status: null
}

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    const response = await axios.get('http://localhost:5000/products')
    return response?.data
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: state => {
      state.status = 'pending'
      state.items = []
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
    },
    [productsFetch.rejected]: state => {
      state.status = 'rejected'
      state.items = []
    }
  }
})

export default productSlice.reducer
