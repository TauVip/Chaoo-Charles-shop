import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setHeaders, url } from './api'

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null
}

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    try {
      const { data } = await axios.get(`${url}/products`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const productsCreate = createAsyncThunk(
  'products/productsCreate',
  async values => {
    try {
      const { data } = await axios.post(`${url}/products`, values, setHeaders())
      return data
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data)
    }
  }
)

export const productsDelete = createAsyncThunk(
  'products/productsDelete',
  async id => {
    try {
      const { data } = await axios.delete(`${url}/products/${id}`, setHeaders())
      return data
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data)
    }
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
    },
    [productsCreate.pending]: state => {
      state.createStatus = 'pending'
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.createStatus = 'success'
      toast.success('Product Created!')
    },
    [productsCreate.rejected]: state => {
      state.createStatus = 'rejected'
    },
    [productsDelete.pending]: state => {
      state.deleteStatus = 'pending'
    },
    [productsDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        item => item._id !== action.payload._id
      )
      state.items = newList
      state.deleteStatus = 'success'
      toast.error('Product Deleted')
    },
    [productsDelete.rejected]: state => {
      state.deleteStatus = 'rejected'
    }
  }
})

export default productSlice.reducer
