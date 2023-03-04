import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { url } from './api'

const initialState = {
  token: localStorage.getItem('token'),
  name: '',
  email: '',
  _id: '',
  isAdmin: '',
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  userLoaded: false
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: user.name,
        email: user.email,
        password: user.password
      })
      localStorage.setItem('token', token.data)
      return token.data
    } catch (err) {
      console.log(err.response.data)
      return rejectWithValue(err.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/login`, {
        email: user.email,
        password: user.password
      })
      localStorage.setItem('token', token.data)
      return token.data
    } catch (err) {
      console.log(err.response.data)
      return rejectWithValue(err.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser(state) {
      const token = state.token
      if (token) {
        const user = jwtDecode(token)

        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          userLoaded: true
        }
      }
    },
    logoutUser(state) {
      localStorage.removeItem('token')

      return {
        ...state,
        token: '',
        name: '',
        email: '',
        _id: '',
        registerStatus: '',
        registerError: '',
        loginStatus: '',
        loginError: '',
        userLoaded: false
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => ({
      ...state,
      registerStatus: 'pending'
    }))
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload)

        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          registerStatus: 'success'
        }
      } else return state
    })
    builder.addCase(registerUser.rejected, (state, action) => ({
      ...state,
      registerStatus: 'rejected',
      registerError: action.payload
    }))
    builder.addCase(loginUser.pending, state => ({
      ...state,
      loginStatus: 'pending'
    }))
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload)

        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          loginStatus: 'success'
        }
      } else return state
    })
    builder.addCase(loginUser.rejected, (state, action) => ({
      ...state,
      loginStatus: 'rejected',
      loginError: action.payload
    }))
  }
})

export const { loadUser, logoutUser } = authSlice.actions

export default authSlice.reducer
