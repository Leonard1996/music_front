import { BrowserRouter } from 'react-router-dom'
import Navbar from './common/components/Navbar'
import Navigator from './common/components/Navigator'
import AuthProvider from './context/Auth'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Navigator />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
