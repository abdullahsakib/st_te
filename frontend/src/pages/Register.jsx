import React, {useState} from 'react'
import API, { setAuthToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register({ setToken, setUser }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isTeacher, setIsTeacher] = useState(false)
  const nav = useNavigate()
  const submit = async e=>{
    e.preventDefault()
    try{
      const res = await API.post('auth/register/', { username, password, is_teacher: isTeacher })
      const { access, user } = res.data
      localStorage.setItem('token', access)
      localStorage.setItem('user', JSON.stringify(user))
      setAuthToken(access)
      setToken(access); setUser(user)
      nav('/')
    }catch(err){ alert('Register failed') }
  }
  return (
    <form onSubmit={submit} className="space-y-2 w-96">
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" className="input" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" className="input" />
      <label><input type="checkbox" checked={isTeacher} onChange={e=>setIsTeacher(e.target.checked)} /> Register as teacher</label>
      <button className="btn">Register</button>
    </form>
  )
}
