import { useState } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '@p/images/facicon.png'
import ConfirmModal from '../UI/ConfirmModal'
import { useChat } from '@/hooks/useChat'

const MENU_ITEMS = [{ label: '홈', path: '/' }]

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  const { resetChat } = useChat()

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const handleReset = () => {
    resetChat()
    setIsResetModalOpen(false)
  }

  return (
    <>
      <header className="h-[52px] px-4 md:px-6 flex items-center justify-between relative z-50 w-full bg-transparent">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleMenu}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            aria-label="메뉴 열기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-6 md:h-6"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <button
            onClick={() => setIsResetModalOpen(true)}
            className="text-base md:text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <span>Portfolio Bot</span>
            <span className="text-[10px] md:text-xs bg-blue-600 px-1.5 py-0.5 rounded-full font-medium text-white/90">
              AI
            </span>
          </button>
        </div>

        <img src={LOGO} alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
      </header>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="새로운 대화 시작"
        message="현재 대화 내용이 모두 초기화됩니다. 계속하시겠습니까?"
        onConfirm={handleReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Overlay for Menu */}

      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[48px] z-30 bg-transparent"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-0 top-[48px] bottom-0 w-64 bg-transparent backdrop-blur-[10px] transition-transform duration-300 ease-in-out z-40 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {MENU_ITEMS.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block px-4 py-2 rounded-md border-b border-[#00000000] hover:border-[#8d8d8d] transition-colors text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MainHeader
