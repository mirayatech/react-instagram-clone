import { Header, Feed, Login } from './exportFiles'
import { Routes, Route } from 'react-router-dom'
export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </div>
  )
}
