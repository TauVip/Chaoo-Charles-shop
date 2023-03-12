import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setHeaders, url } from './api'

const initialState = {
  list: [],
  status: null
}

export const ordersFetch = createAsyncThunk('orders/ordersFetch', async () => {
  try {
    const { data } = await axios.get(`${url}/orders`, setHeaders())
    return data
  } catch (error) {
    console.log(error)
  }
})

export const ordersEdit = createAsyncThunk()

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: state => {
      state.status = 'pending'
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.list = action.payload
      state.status = 'success'
    },
    [ordersFetch.rejected]: state => {
      state.status = 'rejected'
    },
    [ordersEdit.pending]: state => {},
    [ordersEdit.fulfilled]: (state, action) => {},
    [ordersEdit.rejected]: state => {}
  }
})
export default ordersSlice.reducer
