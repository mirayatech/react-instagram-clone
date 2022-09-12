import { Feed, Login } from './exportFiles'
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { Protected } from './components/Protected'

export function App(): JSX.Element {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/feed"
            element={
              <Protected>
                <Feed />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}
