import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../slices/authSlice'
import { StyledForm } from './StyledForm'

const Login = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (auth._id) navigate('/cart')
  }, [auth._id, navigate])

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(loginUser(user))
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type='email'
        placeholder='email'
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
      />
      <input
        type='password'
        placeholder='password'
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button>{auth.loginStatus === 'pending' ? 'Submitting' : 'Login'}</button>

      {auth.loginStatus === 'rejected' && <p>{auth.loginError}</p>}
    </StyledForm>
  )
}
export default Login
