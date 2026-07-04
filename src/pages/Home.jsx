import { useState, useEffect } from 'react'

const statusColor = (status) => {
  if (status === 'Applied') return 'bg-blue-100 text-blue-600 border border-blue-200'
  if (status === 'Interview') return 'bg-yellow-100 text-yellow-600 border border-yellow-200'
  if (status === 'Rejected') return 'bg-red-100 text-red-500 border border-red-200'
  if (status === 'Selected') return 'bg-green-100 text-green-600 border border-green-200'
}

function Home({ jobs, setJobs }) {
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])

  const deleteJob = (index) => {
    const updated = jobs.filter((_, i) => i !== index)
    setJobs(updated)
  }

  const total = jobs.length
  const applied = jobs.filter(j => j.status === 'Applied').length
  const interview = jobs.filter(j => j.status === 'Interview').length
  const selected = jobs.filter(j => j.status === 'Selected').length

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          My Applications 💼
        </h2>
        <p className="text-gray-500 mt-1 text-sm">Track all your job applications in one place!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100">
          <p className="text-3xl font-extrabold text-gray-700">{total}</p>
          <p className="text-gray-400 text-sm mt-1">Total</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-blue-100">
          <p className="text-3xl font-extrabold text-blue-500">{applied}</p>
          <p className="text-blue-400 text-sm mt-1">Applied</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-yellow-100">
          <p className="text-3xl font-extrabold text-yellow-500">{interview}</p>
          <p className="text-yellow-400 text-sm mt-1">Interview</p>
        </div>
        <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-green-100">
          <p className="text-3xl font-extrabold text-green-500">{selected}</p>
          <p className="text-green-400 text-sm mt-1">Selected</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {['All', 'Applied', 'Interview', 'Rejected', 'Selected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition ${
              filter === f
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-400 hover:text-blue-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md border border-gray-100">
          <p className="text-5xl mb-3">📭</p>
          <p className="text-lg font-semibold text-gray-600">No applications yet!</p>
          <p className="text-sm mt-1 text-gray-400">Click "+ Add Job" to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 flex justify-between items-center shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{job.company}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{job.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`${statusColor(job.status)} px-4 py-1 rounded-full text-sm font-semibold`}>
                  {job.status}
                </span>
                <button
                  onClick={() => deleteJob(index)}
                  className="text-gray-300 hover:text-red-400 font-bold text-xl transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home