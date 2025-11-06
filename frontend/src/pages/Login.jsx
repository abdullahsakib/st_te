import React, {useState} from 'react'
import API, { setAuthToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ setToken, setUser }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const submit = async e=>{
    e.preventDefault()
    try{
      const res = await API.post('auth/login/', {username, password})
      const { access, user } = res.data
      localStorage.setItem('token', access)
      localStorage.setItem('user', JSON.stringify(user))
      setAuthToken(access)
      setToken(access); setUser(user)
      nav('/')
    }catch(err){ alert('Login failed') }
  }
  return (
    <form onSubmit={submit} className="space-y-2 w-96">
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" className="input" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" className="input" />
      <button className="btn">Login</button>
    </form>
  )
}
