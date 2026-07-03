import { useState, useEffect } from 'react'

const statusColor = (status) => {
  if (status === 'Applied') return 'bg-blue-100 text-blue-600'
  if (status === 'Interview') return 'bg-yellow-100 text-yellow-600'
  if (status === 'Rejected') return 'bg-red-100 text-red-600'
  if (status === 'Selected') return 'bg-green-100 text-green-600'
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        My Job Applications
      </h2>
      <p className="text-gray-500 mb-6">
        Track all your job applications in one place!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{total}</p>
          <p className="text-gray-500 text-sm">Total</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{applied}</p>
          <p className="text-blue-400 text-sm">Applied</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{interview}</p>
          <p className="text-yellow-400 text-sm">Interview</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{selected}</p>
          <p className="text-green-400 text-sm">Selected</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {['All', 'Applied', 'Interview', 'Rejected', 'Selected'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
          <p className="text-lg">No applications yet!</p>
          <p className="text-sm mt-1">Click "+ Add Job" to get started 🚀</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">{job.company}</h3>
                <p className="text-gray-500 text-sm">{job.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`${statusColor(job.status)} px-3 py-1 rounded-full text-sm font-semibold`}>
                  {job.status}
                </span>
                <button
                  onClick={() => deleteJob(index)}
                  className="text-red-400 hover:text-red-600 font-bold text-lg"
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