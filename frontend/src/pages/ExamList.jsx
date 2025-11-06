import React, {useEffect, useState} from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function ExamList(){
  const [exams,setExams]=useState([])
  useEffect(()=>{ API.get('exams/').then(r=>setExams(r.data)) }, [])
  return (
    <div>
      <h2 className="text-xl">Exams</h2>
      <ul>
        {exams.map(ex=> <li key={ex.id}><Link to={`/exams/${ex.id}`}>{ex.title}</Link></li>)}
      </ul>
    </div>
  )
}
