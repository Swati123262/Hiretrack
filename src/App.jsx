import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddJob from './pages/AddJob'

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
    light: {
      bg: 'bg-gray-100',
      card: 'bg-white',
      text: 'text-gray-800',
      subtext: 'text-gray-400',
      border: 'border-gray-200',
      navbar: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      button: 'bg-white text-indigo-600 hover:bg-indigo-50',
      activeFilter: 'bg-indigo-600 text-white',
      inactiveFilter: 'bg-white text-gray-500 border border-gray-200',
    },
    dark: {
      bg: 'bg-[#0f0f1a]',
      card: 'bg-[#1a1a2e]',
      text: 'text-purple-300',
      subtext: 'text-purple-500',
      border: 'border-purple-900',
      navbar: 'bg-[#1a1a2e] border-b border-purple-900',
      button: 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900',
      activeFilter: 'bg-purple-600 text-white',
      inactiveFilter: 'bg-[#1a1a2e] text-purple-400 border border-purple-800',
    },
  }

  return (
    <BrowserRouter>
      <div className={`${themes[theme].bg} min-h-screen`}>
        <Navbar theme={theme} setTheme={setTheme} themes={themes} />
        <Routes>
          <Route path="/" element={<Home jobs={jobs} setJobs={setJobs} theme={theme} themes={themes} />} />
          <Route path="/add" element={<AddJob onAdd={addJob} theme={theme} themes={themes} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App