import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from '../components/Form'

const auth = () => {
  return (
    <div className="auth">
      <h1>Register / Login</h1>
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigate()

  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
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
      await axios.post('')
    } catch (err) {}
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
