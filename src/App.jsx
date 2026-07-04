import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddJob from './pages/Addjob'

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs')
    return saved ? JSON.parse(saved) : []
  })

  const addJob = (job) => {
    const updated = [...jobs, job]
    setJobs(updated)
    localStorage.setItem('jobs', JSON.stringify(updated))
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home jobs={jobs} setJobs={setJobs} />} />
          <Route path="/add" element={<AddJob onAdd={addJob} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App