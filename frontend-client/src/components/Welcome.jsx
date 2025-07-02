import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()
  return (
  <div className="h-screen max-h-screen  bg-light-bg text-primary-blue flex flex-col justify-center items-center gap-8 px-4">
      <h1 className="text-4xl md:text-5xl font-mansalva text-center">
        Welcome to our PhotoBooth
      </h1>

      <button
        onClick={()=> navigate("/select-template") }
        className="bg-deep-blue text-base-white font-semibold text-lg px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>
    </div>  )
}

export default Welcome

