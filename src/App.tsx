import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

import './styles/_base.scss'

import './styles/tailwind.css'

function App() {
  return <RouterProvider router={router} />
}

export default App
