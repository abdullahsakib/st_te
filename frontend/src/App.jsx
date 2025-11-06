import React, {useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import TeacherDashboard from './pages/TeacherDashboard'
import ExamList from './pages/ExamList'
import StudentExam from './pages/StudentExam'
import { setAuthToken } from './api'

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=> setAuthToken(token), [token])

  const handleLogout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null) }

  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/">Home</Link>
        {!token && <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
        {user && user.is_teacher && <Link to="/teacher">Teacher</Link>}
        {token && <Link to="/exams">Exams</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<div className="text-xl">Welcome to Quiz App</div>} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/:id" element={<StudentExam />} />
      </Routes>
    </div>
  )
}
