import React, {useEffect, useState} from 'react'
import API from '../api'
import { useParams } from 'react-router-dom'

export default function StudentExam(){
  const { id } = useParams()
  const [exam, setExam] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  useEffect(()=>{ API.get(`exams/${id}/`).then(r=>setExam(r.data)) }, [id])

  const setAns = (qid, val)=> setAnswers(prev=>({ ...prev, [qid]: val }))
  const submit = async ()=>{ const res = await API.post(`exams/${id}/submit/`, { answers }); setResult(res.data) }

  if(!exam) return <div>Loading...</div>
  return (
    <div>
      <h2>{exam.title}</h2>
      {exam.questions.map(q=> (
        <div key={q.id} className="mb-4">
          <div>{q.text}</div>
          {['choice_a','choice_b','choice_c','choice_d'].map((c,idx)=> (
            <label key={c}><input type="radio" name={q.id} onChange={()=>setAns(String(q.id), ['A','B','C','D'][idx])} /> {q[c]}</label>
          ))}
        </div>
      ))}
      <button onClick={submit} className="btn">Submit</button>
      {result && <div>Score: {result.score} ({result.correct}/{result.total})</div>}
    </div>
  )
}
