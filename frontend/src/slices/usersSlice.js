import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setHeaders, url } from './api'

const initialState = {
  list: [],
  status: null,
  deleteStatus: null
}

export const usersFetch = createAsyncThunk('users/usersFetch', async () => {
  try {
    const { data } = await axios.get(`${url}/users`, setHeaders())
    return data
  } catch (error) {
    console.log(error)
  }
})

export const userDelete = createAsyncThunk('users/userDelete', async id => {
  try {
    const { data } = await axios.delete(`${url}/users/${id}`, setHeaders())
    return data
  } catch (error) {
    console.log(error.response.data)
    toast.error(error.response?.data, {
      position: 'bottom-left'
    })
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: state => {
      state.status = 'pending'
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload
      state.status = 'success'
    },
    [usersFetch.rejected]: state => {
      state.status = 'rejected'
    },
    [userDelete.pending]: state => {
      state.deleteStatus = 'pending'
    },
    [userDelete.fulfilled]: (state, action) => {
      const newList = state.list.filter(user => user._id !== action.payload._id)
      state.list = newList
      state.deleteStatus = 'success'
      toast.error('User Deleted!', {
        position: 'bottom-left'
      })
    },
    [userDelete.rejected]: state => {
      state.deleteStatus = 'rejected'
    }
  }
})
export default usersSlice.reducer
