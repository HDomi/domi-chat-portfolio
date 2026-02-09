import { Outlet } from 'react-router-dom'
import '@/styles/background/stars.scss'
import MainHeader from './MainHeader'
import { ChatProvider } from '@/context/ChatContext'

const RootLayout = () => {
  return (
    <div className="main-wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <ChatProvider>
        <MainHeader />
        <div className="main-content">
          <Outlet />
        </div>
      </ChatProvider>
    </div>
  )
}

export default RootLayout
