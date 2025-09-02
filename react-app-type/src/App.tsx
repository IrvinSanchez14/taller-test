import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ title: '', description: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const createTask = async () => {
    console.log('Creating task...')
    try {
      const request = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Task',
          description: 'Task description'
        })
      })
      const data = await request.json()
      return data
    } catch (e: unknown){
      console.error(e)
    }
  }

  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input type="text" placeholder="Title" onChange={handleChange} name="title" value={form.title} />
          <input type="text" placeholder="Description" onChange={handleChange} name="description" value={form.description} />
        </div>
        <button style={{ backgroundColor: 'lightblue' }} onClick={createTask}>Create task</button>
      </div>
    </>
  )
}

export default App
