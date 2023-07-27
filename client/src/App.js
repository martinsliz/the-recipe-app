import './App.css'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import home from './pages/home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={home} />
      </Routes>
      <h1>Hello</h1>
    </div>
  )
}

export default App
