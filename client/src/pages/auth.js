import { useState } from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from '../components/Form'
import { useCookies } from 'react-cookie'

const auth = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password
      })
      console.log(response)
      setCookies('access_token', response.data.token)
      window.localStorage.setItem('userID', response.data.userID)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        label="Login"
      />
    </div>
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(`${BASE_URL}/register`, { username, password })
      alert('Registration completed!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        label="Register"
      />
    </div>
  )
}

export default auth
