import React, {useState} from 'react'
import API from '../api'

export default function CreateQuestion({ onCreate }){
  const [text,setText]=useState('')
  const [a,setA]=useState(''); const [b,setB]=useState(''); const [c,setC]=useState(''); const [d,setD]=useState('');
  const [correct,setCorrect]=useState('A')
  const submit = async e=>{
    e.preventDefault()
    await API.post('questions/', { text, choice_a: a, choice_b: b, choice_c: c, choice_d: d, correct_choice: correct })
    setText(''); setA(''); setB(''); setC(''); setD('')
    onCreate && onCreate()
  }
  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Question text" className="input" />
      <input value={a} onChange={e=>setA(e.target.value)} placeholder="Choice A" className="input" />
      <input value={b} onChange={e=>setB(e.target.value)} placeholder="Choice B" className="input" />
      <input value={c} onChange={e=>setC(e.target.value)} placeholder="Choice C" className="input" />
      <input value={d} onChange={e=>setD(e.target.value)} placeholder="Choice D" className="input" />
      <select value={correct} onChange={e=>setCorrect(e.target.value)} className="input">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <button className="btn">Create Question</button>
    </form>
  )
}
