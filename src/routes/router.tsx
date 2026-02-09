import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/Layout/RootLayout'
import Home from '@/pages/Home'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
