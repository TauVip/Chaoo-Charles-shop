import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { setHeaders, url } from '../../slices/api'

const UserProfile = () => {
  const params = useParams()

  const [user, setUser] = useState({
    name: '',
    email: '',
    isAdmin: false,
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    setLoading(true)

    const fetchUser = async () => {
      try {
        const res = axios.get(`${url}/users/find/${params.id}`, setHeaders())

        setUser({ ...res.data, password: '' })
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()

    setLoading(false)
  }, [params.id])

  return <div>UserProfile</div>
}
export default UserProfile

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  border-radius: 5px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-bottom: 0.5rem;
    }
    label {
      margin-bottom: 0.2rem;
      color: gray;
    }
    input {
      margin-bottom: 1rem;
      outline: none;
      border: none;
      border-bottom: 1px solid gray;
    }
  }
`

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`
