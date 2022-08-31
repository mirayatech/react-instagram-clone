import { Feed, Login } from './exportFiles'
import { Routes, Route } from 'react-router-dom'
import { UserAuthContextProvider } from './context/context'
import { ProtectedRoute } from './components/ProtectedRoute'

export function App(): JSX.Element {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </UserAuthContextProvider>
  )
}
