import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddJob from './pages/Addjob'   // Import name AddJob

function App() {
  const [theme, setTheme] = useState('light')

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs')
    return saved ? JSON.parse(saved) : []
  })

  const addJob = (job) => {
    const updated = [...jobs, job]
    setJobs(updated)
    localStorage.setItem('jobs', JSON.stringify(updated))
  }

  const themes = {
    // ... tumhara themes object same rahega
  }

  return (
    <BrowserRouter>
      <div className={`${themes[theme].bg} min-h-screen`}>
        <Navbar theme={theme} setTheme={setTheme} themes={themes} />
        <Routes>
          <Route
            path="/"
            element={<Home jobs={jobs} setJobs={setJobs} theme={theme} themes={themes} />}
          />
          <Route
            path="/add"
            element={<AddJob onAdd={addJob} theme={theme} themes={themes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App