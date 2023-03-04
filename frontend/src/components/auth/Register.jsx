import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../slices/authSlice'
import { StyledForm } from './StyledForm'

const Register = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (auth._id) navigate('/cart')
  }, [auth._id, navigate])

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(registerUser(user))
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type='text'
        placeholder='name'
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
      />
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
      <button>
        {auth.registerStatus === 'pending' ? 'Submitting' : 'Register'}
      </button>

      {auth.registerStatus === 'rejected' && <p>{auth.registerError}</p>}
    </StyledForm>
  )
}
export default Register
