import React, {useEffect, useState} from 'react'
import API from '../api'
import CreateQuestion from './CreateQuestion'

export default function TeacherDashboard(){
  const [questions, setQuestions] = useState([])
  useEffect(()=>{ API.get('questions/').then(r=>setQuestions(r.data)) }, [])
  return (
    <div>
      <h2 className="text-2xl">Teacher Dashboard</h2>
      <CreateQuestion onCreate={()=>API.get('questions/').then(r=>setQuestions(r.data))} />
      <ul>
        {questions.map(q=> <li key={q.id}>{q.text}</li>)}
      </ul>
    </div>
  )
}
