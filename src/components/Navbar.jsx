import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 flex items-center justify-between shadow-lg">
      <Link to="/">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-2xl font-extrabold tracking-tight">HireTrack</span>
        </div>
      </Link>
      <Link to="/add">
        <button className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold hover:bg-indigo-50 transition shadow-md text-sm">
          + Add Job
        </button>
      </Link>
    </nav>
  )
}

export default Navbar